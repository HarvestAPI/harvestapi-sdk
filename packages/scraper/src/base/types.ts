import { ApiItemResponse, ApiListResponse } from '../types';

export type ListingScraperConfig = {
  outputType?: 'json' | 'sqlite';
  outputDir?: string;
  filename?: string;
  /**
   * Table name for SQLite output.
   */
  tableName?: string;
  /**
   * Whether to make an additional request for each item details.
   * @default true
   */
  scrapeDetails?: boolean;
};

export type ListingScraperOptions<TItemShot, TItemDetails> = ListingScraperConfig & {
  fetchList: ({ page }: { page: number }) => Promise<ApiListResponse<TItemShot>>;
  fetchItem: ({
    item,
  }: {
    item: TItemShot;
  }) => Promise<ApiItemResponse<TItemDetails> | null> | null;
  maxPages?: number;
  entityName: string;
};

export type ScraperOptions = {
  apiKey: string;
  basePath?: string;
};
