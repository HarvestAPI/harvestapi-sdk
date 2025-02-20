import { ApiItemResponse, ApiListResponse } from '../types';

export type ListingScraperConfig = {
  outputType?: 'json' | 'csv' | 'sqlite';
  outputDir?: string;
  filename?: string;
  tableName?: string;
};

export type ListingScraperOptions<TItemShot, TItemDetails> = ListingScraperConfig & {
  fetchList: ({ page }: { page: number }) => Promise<ApiListResponse<TItemShot>>;
  fetchItem: ({ item }: { item: TItemShot }) => Promise<ApiItemResponse<TItemDetails>>;
  maxPages?: number;
  entityName: string;
  skipItemRequestsStats?: boolean;
};

export type ScraperOptions = {
  apiKey: string;
  basePath?: string;
};
