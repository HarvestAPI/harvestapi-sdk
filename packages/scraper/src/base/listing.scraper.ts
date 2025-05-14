import { randomUUID } from 'crypto';
import fs from 'fs-extra';
import { dirname, resolve } from 'path';
import type { Database } from 'sqlite';
import { ApiItemResponse, ApiListResponse } from '../types';
import { createConcurrentQueues } from '../utils';
import { ListingScraperOptions } from './types';

type TFetchedItemDetails<TItemDetail> =
  | (Partial<ApiItemResponse<TItemDetail>> & { skipped?: boolean })
  | null
  | undefined;

export class ListingScraper<TItemShort extends { id: string }, TItemDetail extends { id: string }> {
  private id = randomUUID();
  private startTime = new Date();
  private inMemoryItems: TItemDetail[] = [];
  private stats = {
    pages: 0,
    pagesSuccess: 0,
    items: 0,
    itemsSuccess: 0,
    requests: 0,
    requestsStartTime: new Date(),
  };
  private filePath: string;
  private db: Database | null = null;
  private tableName: string;
  private sqliteDatabaseOpenPromise: Promise<void> | null = null;
  private done = false;
  private scrapePagesDone = false;
  private error: any | null = null;
  private scrapedItems: Record<
    string,
    {
      found: boolean;
      scraped: boolean;
    }
  > = {};

  constructor(private options: ListingScraperOptions<TItemShort, TItemDetail>) {
    if (this.options.optionsOverride) {
      this.options = {
        ...this.options,
        ...this.options.optionsOverride,
      };
    }

    if (!this.options.outputType) {
      this.options.outputType = 'sqlite';
    }

    this.tableName = this.options.tableName || `${this.options.entityName}_${this.id}`;
    this.filePath = resolve(
      this.options.outputDir || resolve(process.cwd(), 'output'),
      this.options.filename ||
        `${this.startTime.toISOString().replace(/:/g, '-').replace(/\./g, '-')}_${
          this.options.entityName
        }_${this.id}`,
    );
  }

  log(...args: any[]) {
    if (!this.options.disableLog) {
      console.log(...args); // eslint-disable-line no-console
    }
  }
  errorLog(...args: any[]) {
    if (!this.options.disableErrorLog) {
      console.error(...args);
    }
  }

  private scrapePageQueue!: (args: {
    page: number;
    scrapedList?: ApiListResponse<TItemShort>;
  }) => Promise<void>;

  private fetchItemQueue!: (args: {
    item: TItemShort;
  }) => Promise<TFetchedItemDetails<TItemDetail>>;

  private onItemScrapedQueue!: (args: { item: TItemDetail }) => Promise<void>;

  async scrapeStart() {
    this.stats = {
      pages: 0,
      pagesSuccess: 0,
      items: 0,
      itemsSuccess: 0,
      requests: 0,
      requestsStartTime: new Date(),
    };
    const firstPage = await this.fetchPage({ page: 1 });

    let totalPages = firstPage?.pagination?.totalPages || 0;
    if (this.options.maxPages && totalPages > this.options.maxPages) {
      totalPages = this.options.maxPages;
    }
    if (!totalPages && firstPage?.elements?.length) {
      totalPages = this.options.maxPages;
    }

    const concurrency =
      this.options?.overrideConcurrency || firstPage?.user?.requestsConcurrency || 1;

    this.log(
      `Scraping ${this.options.entityName} with ${concurrency} concurrent ${
        concurrency === 1 ? 'worker' : 'workers'
      }... Total pages: ${totalPages}`,
    );

    if (!firstPage?.elements?.length) {
      this.done = true;
      if (this.error) {
        const errors = Array.isArray(this.error) ? this.error : [this.error];
        this.errorLog(...errors);
      }
      this.errorLog('Error fetching first page or no items found. Exiting.');
      return;
    }

    this.scrapePageQueue = createConcurrentQueues(2, (args) => this.scrapePage(args));
    this.fetchItemQueue = createConcurrentQueues(concurrency, async ({ item }) => {
      if (this.options.maxItems && this.stats.itemsSuccess + 1 > this.options.maxItems) {
        this.done = true;
        this.error = `Max items limit reached: ${this.options.maxItems}`;
        return null;
      }
      return await this.options.fetchItem({ item })?.catch((error) => {
        this.errorLog('Error scraping item', error);
        return null;
      });
    });
    this.onItemScrapedQueue = createConcurrentQueues(
      this.options.outputType === 'sqlite' ? 1 : concurrency,
      ({ item }) => this.onItemScraped({ item }),
    );

    this.stats.requestsStartTime = new Date();
    this.stats.pages = 1;
    this.stats.pagesSuccess = 1;

    if (this.options.outputType === 'sqlite') {
      this.sqliteDatabaseOpenPromise = this.createSqliteDatabase();
    }

    const promises: Promise<void>[] = [];
    for (let page = 1; page <= totalPages; page++) {
      promises.push(
        this.scrapePageQueue({ page, scrapedList: page === 1 ? firstPage : undefined }),
      );
    }

    await Promise.all(promises);
    await this.finalize();

    this.log(
      `Finished scraping ${this.options.entityName}. Scraped pages: ${this.stats.pages}. Scraped items: ${this.stats.itemsSuccess}. Total requests: ${this.stats.requests}.`,
    );

    if (this.error) {
      const errors = Array.isArray(this.error) ? this.error : [this.error];
      this.errorLog(...errors);
    }

    return this.stats;
  }

  private async scrapePage({
    page,
    scrapedList,
  }: {
    page: number;
    scrapedList?: ApiListResponse<TItemShort>;
  }) {
    if (this.done || this.scrapePagesDone) return;
    const list = scrapedList ? scrapedList : await this.fetchPage({ page });
    if (this.done) return;

    let details: TItemDetail[] = [];

    if (list?.elements?.length) {
      details = await this.scrapePageItems({ list });
    } else {
      this.scrapePagesDone = true;
    }
    if (this.done) return;

    if (!details?.length) {
      this.scrapePagesDone = true;
    } else {
      this.scrapePagesDone = false;
    }

    this.log(
      `Scraped ${this.options.entityName} page ${page}. Items found: ${
        details.length
      }. Requests/second: ${(
        this.stats.requests /
        ((Date.now() - this.stats.requestsStartTime.getTime()) / 1000)
      ).toFixed(2)}`,
    );
  }

  private async fetchPage({ page }: { page: number }) {
    this.log(`Scraping page ${page} of ${this.options.entityName}...`);

    const result = await this.options.fetchList({ page }).catch((error) => {
      this.errorLog('Error fetching page', page, error);
      return null;
    });
    if (result?.status === 402) {
      this.done = true;
      this.error = result.error || 'Request limit exceeded - upgrade your plan';
      return null;
    }
    this.stats.pages++;
    this.stats.requests++;
    if (result?.entityId) {
      this.stats.pagesSuccess++;
    }
    return result;
  }

  private async scrapePageItems({ list }: { list: ApiListResponse<TItemShort> }) {
    if (!list?.elements) {
      return [];
    }

    const details: TItemDetail[] = [];

    const itemPromises = list.elements.map(async (item) => {
      let itemDetails: TFetchedItemDetails<TItemDetail> = null;
      this.stats.items++;

      if (this.scrapedItems[item.id]) {
        return;
      }
      this.scrapedItems[item.id] = { found: true, scraped: false };

      if (this.options.scrapeDetails) {
        itemDetails = await this.fetchItemQueue({ item });

        if (itemDetails?.status === 402) {
          this.done = true;
          this.error = itemDetails?.error || 'Request limit exceeded - upgrade your plan';
          return details;
        }
      } else {
        itemDetails = {
          entityId: item?.id,
          element: item as any,
          status: list.status,
          error: list.error,
          query: list.query,
        };
      }

      if (this.options.scrapeDetails && !itemDetails?.skipped) {
        this.stats.requests++;
      }

      if (itemDetails?.element && itemDetails.entityId) {
        if (this.options.maxItems && this.stats.itemsSuccess + 1 > this.options.maxItems) {
          this.done = true;
          this.error = `Max items limit reached: ${this.options.maxItems}`;
          return details;
        }

        if (!this.scrapedItems[itemDetails.entityId].scraped) {
          this.scrapedItems[itemDetails.entityId].scraped = true;
          this.stats.itemsSuccess++;

          await this.onItemScrapedQueue({ item: itemDetails.element });
          details.push(itemDetails.element);
        }
      }
    });

    await Promise.all(itemPromises).catch((error) => {
      this.errorLog('Error scraping items', error);
    });

    return details;
  }

  private onItemScraped = async ({ item }: { item: TItemDetail }) => {
    if (this.options.outputType === 'json') {
      this.inMemoryItems.push(item);
      void this.options.onItemScraped?.({ item });
    }
    if (this.options.outputType === 'sqlite') {
      await this.insertSqliteItem(item).catch((error) => {
        this.errorLog('Error inserting item to SQLite:', error);
      });
      void this.options.onItemScraped?.({ item });
    }
    if (this.options.outputType === 'callback') {
      await this.options.onItemScraped?.({ item });
    }
  };

  private async createSqliteDatabase() {
    try {
      const open = require('sqlite').open; // eslint-disable-line @typescript-eslint/no-require-imports
      const sqlite3 = require('sqlite3'); // eslint-disable-line @typescript-eslint/no-require-imports

      await fs.ensureDir(dirname(this.filePath));

      this.db = await open({
        filename: `${this.filePath}.sqlite`,
        driver: sqlite3.Database,
      });

      await this.db!.exec(
        `CREATE TABLE IF NOT EXISTS "${this.tableName}" (db_id INTEGER PRIMARY KEY AUTOINCREMENT)`,
      );
    } catch (error) {
      this.error = ['Error creating SQLite database:', error];
      this.done = true;
    }
  }

  private async insertSqliteItem(item: TItemDetail) {
    await this.sqliteDatabaseOpenPromise;

    const existingColumns = await this.db!.all(`PRAGMA table_info("${this.tableName}")`);
    const existingColumnNames = existingColumns.map((col) => col.name);

    for (const key of Object.keys(item as any)) {
      if (!existingColumnNames.includes(key)) {
        await this.db!.exec(`ALTER TABLE "${this.tableName}" ADD COLUMN "${key}" TEXT`);
      }
    }

    const keys = Object.keys(item as any)
      .map((key) => key)
      .map((key) => `"${key}"`);

    const insertSQL = `INSERT INTO "${this.tableName}" (${keys.join(', ')}) VALUES (${keys
      .map(() => '?')
      .join(', ')})`;

    await this.db!.run(
      insertSQL,
      Object.values(item as any).map((value) =>
        typeof value === 'object' ? JSON.stringify(value) : String(value),
      ),
    );
  }

  private async finalize() {
    if (this.options.outputType === 'json') {
      fs.outputJson(
        `${this.filePath}.json`,
        {
          stats: this.stats,
          list: this.inMemoryItems,
        },
        { spaces: 2 },
      );
    }

    if (this.db) {
      await this.db.close();
    }
  }
}
