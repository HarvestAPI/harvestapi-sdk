import { ApiItemResponse, ApiListResponse } from '../types';

export type ListingScraperConfig<TItemShot, TItemDetails> = {
  outputType?: 'json' | 'sqlite' | 'callback';
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

  onItemScraped?: (args: { item: TItemShot | TItemDetails }) => any;
  overrideConcurrency?: number;
  maxItems?: number;
  disableLog?: boolean;
  disableErrorLog?: boolean;
};

export type ListingScraperOptions<TItemShot, TItemDetails> = ListingScraperConfig<
  TItemShot,
  TItemDetails
> & {
  fetchList: ({ page }: { page: number }) => Promise<ApiListResponse<TItemShot>>;
  fetchItem: ({
    item,
  }: {
    item: TItemShot;
  }) => Promise<(ApiItemResponse<TItemDetails> | { skipped: boolean }) | null> | null;
  maxPages?: number;
  entityName: string;
};

export type ScraperOptions = {
  apiKey: string;
  baseUrl?: string;
  addHeaders?: Record<string, string>;
};
