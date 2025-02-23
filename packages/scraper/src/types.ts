export interface BaseApiResponse {
  id: string | null;
  status: string;
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
  } | null;
  elements: TItem[];
};
