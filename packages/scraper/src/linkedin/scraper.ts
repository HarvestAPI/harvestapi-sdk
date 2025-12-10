import { BaseScraper, ScraperOptions } from '../base';
import { ListingScraper } from '../base/listing.scraper';
import { ApiItemResponse, ApiListResponse } from '../types';
import {
  BaseFetchParams,
  Company,
  CompanyShort,
  GetLinkedinCompanyParams,
  GetLinkedinJobParams,
  GetLinkedinPostCommentsParams,
  GetLinkedinPostParams,
  GetLinkedinPostReactionsParams,
  GetLinkedinProfileCommentsParams,
  GetLinkedInProfileParams,
  GetLinkedinProfileReactionsParams,
  Job,
  JobShort,
  PostComment,
  PostReaction,
  PostShort,
  Profile,
  ProfileReaction,
  ProfileServiceShort,
  ProfileShort,
  ScrapeLinkedinCompaniesParams,
  ScrapeLinkedinJobsParams,
  ScrapeLinkedinPostCommentsParams,
  ScrapeLinkedinPostReactionsParams,
  ScrapeLinkedinPostsParams,
  ScrapeLinkedinProfileCommentsParams,
  ScrapeLinkedinProfileReactionsParams,
  ScrapeLinkedinProfilesParams,
  ScrapeLinkedinSalesNavLeadsParams,
  ScrapeLinkedinServicesParams,
  SearchLinkedinCompaniesParams,
  SearchLinkedinJobsParams,
  SearchLinkedinPostsParams,
  SearchLinkedInProfilesParams,
  SearchLinkedInSalesNavLeadsParams,
  SearchLinkedinServicesParams,
} from './types';

export class LinkedinScraper {
  private scraper: BaseScraper;

  /** @internal */
  constructor(private options: ScraperOptions) {
    this.scraper = new BaseScraper(options);
  }

  async getProfile(
    params: BaseFetchParams & GetLinkedInProfileParams,
  ): Promise<ApiItemResponse<Profile>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile', params });
  }

  async getProfileId(
    params: BaseFetchParams & {
      url?: string;
      publicIdentifier?: string;
    },
  ): Promise<ApiItemResponse<{ id: string }>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile-id', params });
  }

  /** @internal */
  async searchProfileEmail({
    profile,
    ...params
  }: BaseFetchParams & { profile: Partial<Profile> }): Promise<
    ApiItemResponse<{ email?: string }>
  > {
    return this.scraper.fetchApi({
      path: 'linkedin/email-search-by-profile',
      params,
      method: 'POST',
      body: {
        profile,
      },
    });
  }

  async searchProfiles(
    params: BaseFetchParams & SearchLinkedInProfilesParams,
  ): Promise<ApiListResponse<ProfileShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile-search', params });
  }

  async getCompany(
    params: BaseFetchParams & GetLinkedinCompanyParams,
  ): Promise<ApiItemResponse<Company>> {
    return this.scraper.fetchApi({ path: 'linkedin/company', params });
  }

  async searchCompanies(
    params: BaseFetchParams & SearchLinkedinCompaniesParams,
  ): Promise<ApiListResponse<CompanyShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/company-search', params });
  }

  async getJob(params: BaseFetchParams & GetLinkedinJobParams): Promise<ApiItemResponse<Job>> {
    const results = await this.scraper.fetchApi({ path: 'linkedin/job', params });
    return results;
  }

  async searchJobs(
    params: BaseFetchParams & SearchLinkedinJobsParams,
  ): Promise<ApiListResponse<JobShort>> {
    const results = await this.scraper.fetchApi({ path: 'linkedin/job-search', params });
    return results;
  }

  async searchPosts(
    params: BaseFetchParams & SearchLinkedinPostsParams,
  ): Promise<ApiListResponse<PostShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/post-search', params });
  }

  async getPost(
    params: BaseFetchParams & GetLinkedinPostParams,
  ): Promise<ApiItemResponse<PostShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/post', params });
  }

  async getPostReactions(
    params: BaseFetchParams & GetLinkedinPostReactionsParams,
  ): Promise<ApiListResponse<PostReaction>> {
    return this.scraper.fetchApi({ path: 'linkedin/post-reactions', params });
  }

  async getPostComments(
    params: BaseFetchParams & GetLinkedinPostCommentsParams,
  ): Promise<ApiListResponse<PostComment>> {
    return this.scraper.fetchApi({ path: 'linkedin/post-comments', params });
  }

  async getProfileComments(
    params: BaseFetchParams & GetLinkedinProfileCommentsParams,
  ): Promise<ApiListResponse<PostComment>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile-comments', params });
  }

  async getProfileReactions(
    params: BaseFetchParams & GetLinkedinProfileReactionsParams,
  ): Promise<ApiListResponse<ProfileReaction>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile-reactions', params });
  }

  async scrapeJobs({ query, ...options }: ScrapeLinkedinJobsParams) {
    return new ListingScraper<JobShort, Job>({
      fetchList: (listParams) => this.searchJobs({ ...query, ...listParams }),
      fetchItem: async ({ item, ...rest }) =>
        item?.id ? this.getJob({ jobId: item.id, ...rest }) : { skipResult: true },
      scrapeDetails: true,
      entityName: 'jobs',
      ...options,
      maxPageNumber: 40,
    }).scrapeStart();
  }

  async scrapeCompanies({ query, ...options }: ScrapeLinkedinCompaniesParams) {
    return new ListingScraper<CompanyShort, Company>({
      fetchList: (listParams) => this.searchCompanies({ ...query, ...listParams }),
      fetchItem: async ({ item, ...rest }) =>
        item?.universalName
          ? this.getCompany({ universalName: item.universalName, ...rest })
          : { skipResult: true },
      scrapeDetails: true,
      entityName: 'companies',
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  async scrapeProfiles({ query, findEmail, ...options }: ScrapeLinkedinProfilesParams) {
    return new ListingScraper<ProfileShort, Profile>({
      fetchList: (listParams) => this.searchProfiles({ ...query, ...listParams }),
      fetchItem: async ({ item, ...rest }) =>
        item?.publicIdentifier
          ? this.getProfile({ publicIdentifier: item.publicIdentifier, findEmail, ...rest })
          : { skipResult: true },
      scrapeDetails: true,
      entityName: 'profiles',
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  async scrapePosts({ query, ...options }: ScrapeLinkedinPostsParams) {
    return new ListingScraper<PostShort, PostShort>({
      fetchList: (listParams) => this.searchPosts({ ...query, ...listParams }),
      fetchItem: async ({ item }) =>
        item?.id
          ? ({ entityId: item?.id, element: item } as ApiItemResponse<PostShort>)
          : { skipResult: true },
      scrapeDetails: false,
      entityName: 'posts',
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  async scrapePostReactions({ query, ...options }: ScrapeLinkedinPostReactionsParams) {
    return new ListingScraper<PostReaction, PostReaction>({
      fetchList: (listParams) => this.getPostReactions({ ...query, ...listParams }),
      fetchItem: async ({ item }) =>
        item?.id
          ? ({ entityId: item?.id, element: item } as ApiItemResponse<PostReaction>)
          : { skipResult: true },
      scrapeDetails: false,
      entityName: 'post-reactions',
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  async scrapePostComments({ query, ...options }: ScrapeLinkedinPostCommentsParams) {
    return new ListingScraper<PostComment, PostComment>({
      fetchList: (fetchArgs) => this.getPostComments({ ...query, ...fetchArgs }),
      fetchItem: async ({ item }) =>
        item?.id
          ? ({ entityId: item?.id, element: item } as ApiItemResponse<PostComment>)
          : { skipResult: true },
      scrapeDetails: false,
      entityName: 'post-comments',
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  async scrapeProfileComments({ query, ...options }: ScrapeLinkedinProfileCommentsParams) {
    return new ListingScraper<PostComment, PostComment>({
      fetchList: (fetchArgs) => this.getProfileComments({ ...query, ...fetchArgs }),
      fetchItem: async ({ item }) =>
        item?.id
          ? ({ entityId: item?.id, element: item } as ApiItemResponse<PostComment>)
          : { skipResult: true },
      scrapeDetails: false,
      entityName: 'profile-comments',
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  async scrapeProfileReactions({ query, ...options }: ScrapeLinkedinProfileReactionsParams) {
    return new ListingScraper<ProfileReaction, ProfileReaction>({
      fetchList: (fetchArgs) => {
        return this.getProfileReactions({ ...query, ...fetchArgs });
      },
      fetchItem: async ({ item }) =>
        item?.id
          ? ({ entityId: item?.id, element: item } as ApiItemResponse<ProfileReaction>)
          : { skipResult: true },
      scrapeDetails: false,
      entityName: 'profile-reactions',
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  async searchSalesNavigatorLeads(
    params: BaseFetchParams & SearchLinkedInSalesNavLeadsParams,
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
      fetchItem: async ({ item, ...rest }) => {
        return item?.id
          ? this.getProfile({ profileId: item.id, findEmail, ...rest })
          : { skipResult: true };
      },
      getFetchListParams: () => ({}),
      scrapeDetails: true,
      entityName: 'profiles',
      warnPageLimit: true,
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  async getGroup(
    params: BaseFetchParams & { groupId?: string; url?: string },
  ): Promise<ApiItemResponse<{ name: string; url: string }>> {
    return this.scraper.fetchApi({ path: 'linkedin/group', params });
  }

  async searchGroups(
    params: BaseFetchParams & { search: string; page?: number },
  ): Promise<ApiListResponse<{ name: string; url: string }>> {
    return this.scraper.fetchApi({ path: 'linkedin/group-search', params });
  }

  async searchServices(
    params: BaseFetchParams & SearchLinkedinServicesParams,
  ): Promise<ApiListResponse<ProfileServiceShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/service-search', params });
  }

  async scrapeServices({ query, findEmail, ...options }: ScrapeLinkedinServicesParams) {
    return new ListingScraper<ProfileServiceShort, ProfileServiceShort & Profile>({
      fetchList: (listParams) => this.searchServices({ ...query, ...listParams }),
      fetchItem: async ({ item }) => {
        const profileResult = await this.getProfile({ url: item.linkedinProfileUrl, findEmail });
        profileResult.element = {
          ...item,
          ...profileResult.element,
        };
        return profileResult as ApiItemResponse<ProfileServiceShort & Profile>;
      },
      scrapeDetails: true,
      entityName: 'services',
      ...options,
      maxPageNumber: 100,
    }).scrapeStart();
  }

  /** @internal */
  async test() {
    return this.scraper.fetchApi({ path: 'linkedin/test' });
  }
}
