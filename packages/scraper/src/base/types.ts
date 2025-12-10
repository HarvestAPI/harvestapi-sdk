import { ApiItemResponse, ApiListResponse, ApiPagination } from '../types';

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

  /**
   * Whether to  stop scraping when all items on a page are skipped.
   * @default false
   */
  stopIfAllSkipped?: boolean;

  onItemScraped?: (
    args: {
      pagination: ApiPagination | null;
      item: TItemShot | TItemDetails;
      logger: Required<ScraperOptions>['logger'];
    } & Partial<ApiItemResponse<TItemShot | TItemDetails>>,
  ) => any;
  onFirstPageFetched?: (args: { data: ApiListResponse<TItemShot> | null }) => any;
  onPageFetched?: (args: { page: number; data: ApiListResponse<TItemShot> | null }) => any;
  overrideConcurrency?: number;
  overridePageConcurrency?: number;
  maxItems?: number;
  disableLog?: boolean;
  disableErrorLog?: boolean;
  optionsOverride?: Partial<ListingScraperOptions<TItemShot, TItemDetails>>;
  sessionId?: string;
  addListingHeaders?: Record<string, string>;
  addItemHeaders?: Record<string, string>;
  takePages?: number;
  startPage?: number;
  getFetchListParams?: (args: {
    page: number;
    pagination: ApiPagination | null;
  }) => Record<string, any>;
};

export type ItemDetailsExtendedProperties = {
  skipResult?: boolean;
  skipCount?: boolean;
  done?: boolean;
  stopIfAllSkipped?: boolean;
};

export type ListingScraperOptions<TItemShot, TItemDetails> = ListingScraperConfig<
  TItemShot,
  TItemDetails
> & {
  fetchList: (args: {
    page: number;
    paginationToken?: string | null;
    sessionId?: string;
    addHeaders?: Record<string, string>;
  }) => Promise<ApiListResponse<TItemShot>>;
  fetchItem: (args: {
    item: TItemShot;
    sessionId?: string;
    addHeaders?: Record<string, string>;
  }) => Promise<(ApiItemResponse<TItemDetails> | ItemDetailsExtendedProperties) | null> | null;
  maxPageNumber: number;
  entityName: string;
  warnPageLimit?: boolean;
};

export type ScraperOptions = {
  apiKey: string;
  baseUrl?: string;
  addHeaders?: Record<string, string>;
  logger?: {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
};
