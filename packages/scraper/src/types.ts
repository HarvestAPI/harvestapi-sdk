export interface BaseApiResponse {
  entityId: string | null;
  status: number;
  error: any;
  query: Record<string, any>;
  /** @internal */
  liUrl?: string;
  user?: {
    subscriptionPlan: string;
    requestsThisCycle: number;
    requestsLeftThisCycle: number;
    requestsUsedThisCycle: number;
    requestsConcurrency: number;
  };
}

export type ApiItemResponse<TItem> = BaseApiResponse & {
  element: TItem;
};

export type ApiListResponse<TItem> = BaseApiResponse & {
  pagination: {
    totalPages: number;
    totalElements: number;
    pageNumber: number;
    previousElements: number;
    pageSize: number;
    paginationToken?: string | null;
  } | null;
  elements: TItem[];
};
