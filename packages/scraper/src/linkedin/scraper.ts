import { BaseScraper, ScraperOptions } from '../base';
import { ListingScraper } from '../base/listing.scraper';
import { ApiItemResponse, ApiListResponse } from '../types';
import {
  Company,
  CompanyShort,
  GetLinkedinCompanyParams,
  GetLinkedinJobParams,
  GetLinkedinPostCommentsParams,
  GetLinkedinPostReactionsParams,
  GetLinkedInProfileParams,
  Job,
  JobShort,
  PostComment,
  PostReaction,
  PostShort,
  Profile,
  ProfileShort,
  ScrapeLinkedinCompaniesParams,
  ScrapeLinkedinJobsParams,
  ScrapeLinkedinPostCommentsParams,
  ScrapeLinkedinPostReactionsParams,
  ScrapeLinkedinPostsParams,
  ScrapeLinkedinProfilesParams,
  ScrapeLinkedinSalesNavLeadsParams,
  SearchLinkedinCompaniesParams,
  SearchLinkedInCompanyAssociatedProfilesParams,
  SearchLinkedinJobsParams,
  SearchLinkedinPostsParams,
  SearchLinkedInProfilesParams,
  SearchLinkedInSalesNavLeadsParams,
} from './types';

export class LinkedinScraper {
  private scraper: BaseScraper;

  /** @internal */
  constructor(private options: ScraperOptions) {
    this.scraper = new BaseScraper(options);
  }

  async getProfile(params: GetLinkedInProfileParams): Promise<ApiItemResponse<Profile>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile', params });
  }

  async getProfileId(params: {
    url?: string;
    publicIdentifier?: string;
  }): Promise<ApiItemResponse<{ id: string }>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile-id', params });
  }

  async searchProfiles(
    params: SearchLinkedInProfilesParams,
  ): Promise<ApiListResponse<ProfileShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile-search', params });
  }

  async getCompany(params: GetLinkedinCompanyParams): Promise<ApiItemResponse<Company>> {
    return this.scraper.fetchApi({ path: 'linkedin/company', params });
  }

  async searchCompanies(
    params: SearchLinkedinCompaniesParams,
  ): Promise<ApiListResponse<CompanyShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/company-search', params });
  }

  async getJob(params: GetLinkedinJobParams): Promise<ApiItemResponse<Job>> {
    return this.scraper.fetchApi({ path: 'linkedin/job', params });
  }

  async searchJobs(params: SearchLinkedinJobsParams): Promise<ApiListResponse<JobShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/job-search', params });
  }

  async searchPosts(params: SearchLinkedinPostsParams): Promise<ApiListResponse<PostShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/post-search', params });
  }

  async getPostReactions(
    params: GetLinkedinPostReactionsParams,
  ): Promise<ApiListResponse<PostReaction>> {
    return this.scraper.fetchApi({ path: 'linkedin/post-reactions', params });
  }

  async getPostComments(
    params: GetLinkedinPostCommentsParams,
  ): Promise<ApiListResponse<PostComment>> {
    return this.scraper.fetchApi({ path: 'linkedin/post-comments', params });
  }

  async searchCompanyAssociatedProfiles(
    params: SearchLinkedInCompanyAssociatedProfilesParams,
  ): Promise<ApiListResponse<ProfileShort>> {
    return this.scraper.fetchApi({
      path: 'linkedin/company-associated-profiles',
      params,
    });
  }

  async scrapeJobs({ query, ...options }: ScrapeLinkedinJobsParams) {
    return new ListingScraper<JobShort, Job>({
      fetchList: ({ page }) => this.searchJobs({ ...query, page }),
      fetchItem: async ({ item }) =>
        item?.id ? this.getJob({ jobId: item.id }) : { skipped: true },
      scrapeDetails: true,
      entityName: 'jobs',
      ...options,
      maxPages: 40,
    }).scrapeStart();
  }

  async scrapeCompanies({ query, ...options }: ScrapeLinkedinCompaniesParams) {
    return new ListingScraper<CompanyShort, Company>({
      fetchList: ({ page }) => this.searchCompanies({ ...query, page }),
      fetchItem: async ({ item }) =>
        item?.universalName
          ? this.getCompany({ universalName: item.universalName })
          : { skipped: true },
      scrapeDetails: true,
      entityName: 'companies',
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  async scrapeProfiles({ query, tryFindEmail, ...options }: ScrapeLinkedinProfilesParams) {
    return new ListingScraper<ProfileShort, Profile>({
      fetchList: ({ page }) => this.searchProfiles({ ...query, page }),
      fetchItem: async ({ item }) =>
        item?.publicIdentifier
          ? this.getProfile({ publicIdentifier: item.publicIdentifier, tryFindEmail })
          : { skipped: true },
      scrapeDetails: true,
      entityName: 'profiles',
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  async scrapePosts({ query, ...options }: ScrapeLinkedinPostsParams) {
    return new ListingScraper<PostShort, PostShort>({
      fetchList: ({ page }) => this.searchPosts({ ...query, page }),
      fetchItem: async ({ item }) =>
        item?.id
          ? ({ entityId: item?.id, element: item } as ApiItemResponse<PostShort>)
          : { skipped: true },
      scrapeDetails: false,
      entityName: 'posts',
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  async scrapePostReactions({ query, ...options }: ScrapeLinkedinPostReactionsParams) {
    return new ListingScraper<PostReaction, PostReaction>({
      fetchList: ({ page }) => this.getPostReactions({ ...query, page }),
      fetchItem: async ({ item }) =>
        item?.id
          ? ({ entityId: item?.id, element: item } as ApiItemResponse<PostReaction>)
          : { skipped: true },
      scrapeDetails: false,
      entityName: 'post-reactions',
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  async scrapePostComments({ query, ...options }: ScrapeLinkedinPostCommentsParams) {
    return new ListingScraper<PostComment, PostComment>({
      fetchList: (fetchArgs) => this.getPostComments({ ...query, ...fetchArgs }),
      fetchItem: async ({ item }) =>
        item?.id
          ? ({ entityId: item?.id, element: item } as ApiItemResponse<PostComment>)
          : { skipped: true },
      scrapeDetails: false,
      entityName: 'post-comments',
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  async searchSalesNavigatorLeads(
    params: SearchLinkedInSalesNavLeadsParams,
  ): Promise<ApiListResponse<ProfileShort>> {
    return this.scraper.fetchApi({ path: 'linkedin-sales-nav/lead-search', params });
  }

  async scrapeSalesNavigatorLeads({
    query,
    tryFindEmail,
    ...options
  }: ScrapeLinkedinSalesNavLeadsParams) {
    return new ListingScraper<ProfileShort, Profile>({
      fetchList: ({ page }) => this.searchSalesNavigatorLeads({ ...query, page }),
      fetchItem: async ({ item }) => {
        return item?.id ? this.getProfile({ profileId: item.id, tryFindEmail }) : { skipped: true };
      },
      scrapeDetails: true,
      entityName: 'profiles',
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  /** @internal */
  async test() {
    return this.scraper.fetchApi({ path: 'linkedin/test' });
  }
}
