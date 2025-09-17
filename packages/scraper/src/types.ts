export interface BaseApiResponse {
  entityId: string | null;
  requestId: string;
  status: number;
  error: any;
  query: Record<string, any>;
  originalQuery: Record<string, any>;
  /** @internal */
  liUrl?: string | string[];
  user?: {
    membershipTier: string;
    requestsConcurrency: number;
  };
  payments: string[];
  cost: number;
}

export type ApiItemResponse<TItem> = BaseApiResponse & {
  element: TItem;
};

export type ApiPagination = {
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  previousElements: number;
  pageSize: number;
  paginationToken?: string | null;
  totalResultCount?: number;
};

export type ApiListResponse<TItem> = BaseApiResponse & {
  pagination: ApiPagination | null;
  elements: TItem[];
};
