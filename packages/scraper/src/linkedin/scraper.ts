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
    const results = await this.scraper.fetchApi({ path: 'linkedin/job', params });
    return results;
  }

  async searchJobs(params: SearchLinkedinJobsParams): Promise<ApiListResponse<JobShort>> {
    const results = await this.scraper.fetchApi({ path: 'linkedin/job-search', params });
    return results;
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
      fetchList: (listParams) => this.searchJobs({ ...query, ...listParams }),
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
      fetchList: (listParams) => this.searchCompanies({ ...query, ...listParams }),
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

  async scrapeProfiles({ query, findEmail, ...options }: ScrapeLinkedinProfilesParams) {
    return new ListingScraper<ProfileShort, Profile>({
      fetchList: (listParams) => this.searchProfiles({ ...query, ...listParams }),
      fetchItem: async ({ item }) =>
        item?.publicIdentifier
          ? this.getProfile({ publicIdentifier: item.publicIdentifier, findEmail })
          : { skipped: true },
      scrapeDetails: true,
      entityName: 'profiles',
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  async scrapePosts({ query, ...options }: ScrapeLinkedinPostsParams) {
    return new ListingScraper<PostShort, PostShort>({
      fetchList: (listParams) => this.searchPosts({ ...query, ...listParams }),
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
      fetchList: (listParams) => this.getPostReactions({ ...query, ...listParams }),
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
    findEmail,
    ...options
  }: ScrapeLinkedinSalesNavLeadsParams) {
    return new ListingScraper<ProfileShort, Profile>({
      fetchList: (listParams) => this.searchSalesNavigatorLeads({ ...query, ...listParams }),
      fetchItem: async ({ item }) => {
        return item?.id ? this.getProfile({ profileId: item.id, findEmail }) : { skipped: true };
      },
      scrapeDetails: true,
      entityName: 'profiles',
      warnPageLimit: true,
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  /** @internal */
  async test() {
    return this.scraper.fetchApi({ path: 'linkedin/test' });
  }
}
