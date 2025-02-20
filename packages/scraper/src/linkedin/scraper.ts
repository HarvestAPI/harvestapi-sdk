import { BaseScraper, ListingScraperConfig, ScraperOptions } from '../base';
import { ListingScraper } from '../base/listing.scraper';
import { ApiItemResponse, ApiListResponse } from '../types';
import {
  Company,
  CompanyShort,
  GetCompanyParams,
  GetJobParams,
  GetLinkedInProfileParams,
  Job,
  JobShort,
  PostShort,
  Profile,
  ProfileShort,
  SearchCompaniesParams,
  SearchJobsParams,
  SearchLinkedInProfilesParams,
  SearchPostsParams,
} from './types';

export class LinkedinScraper {
  scraper: BaseScraper;

  constructor(private options: ScraperOptions) {
    this.scraper = new BaseScraper(options);
  }
  async getProfile(params: GetLinkedInProfileParams): Promise<ApiItemResponse<Profile>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile', params });
  }

  async searchProfiles(
    params: SearchLinkedInProfilesParams,
  ): Promise<ApiListResponse<ProfileShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile-search', params });
  }

  async getCompany(params: GetCompanyParams): Promise<ApiItemResponse<Company>> {
    return this.scraper.fetchApi({ path: 'linkedin/company', params });
  }

  async searchCompanies(params: SearchCompaniesParams): Promise<ApiListResponse<CompanyShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/company-search', params });
  }

  async getJob(params: GetJobParams): Promise<ApiItemResponse<Job>> {
    return this.scraper.fetchApi({ path: 'linkedin/job', params });
  }

  async searchJobs(params: SearchJobsParams): Promise<ApiListResponse<JobShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/job-search', params });
  }

  async searchPosts(params: SearchPostsParams): Promise<ApiListResponse<PostShort>> {
    return this.scraper.fetchApi({ path: 'linkedin/post-search', params });
  }

  async test() {
    return this.scraper.fetchApi({ path: 'linkedin/test' });
  }

  async scrapeJobs({
    query,
    ...options
  }: {
    query: SearchJobsParams;
  } & ListingScraperConfig) {
    new ListingScraper<JobShort, Job>({
      fetchList: ({ page }) => this.searchJobs({ ...query, page }),
      fetchItem: ({ item }) => this.getJob({ jobId: item.id }),
      ...options,
      maxPages: 40,
      entityName: 'jobs',
    });
  }

  async scrapeCompanies({
    query,
    ...options
  }: {
    query: SearchCompaniesParams;
  } & ListingScraperConfig) {
    new ListingScraper<CompanyShort, Company>({
      fetchList: ({ page }) => this.searchCompanies({ ...query, page }),
      fetchItem: ({ item }) => this.getCompany({ universalName: item.universalName }),
      ...options,
      maxPages: 100,
      entityName: 'companies',
    });
  }

  async scrapeProfiles({
    query,
    ...options
  }: {
    query: SearchLinkedInProfilesParams;
  } & ListingScraperConfig) {
    new ListingScraper<ProfileShort, Profile>({
      fetchList: ({ page }) => this.searchProfiles({ ...query, page }),
      fetchItem: ({ item }) => this.getProfile({ publicIdentifier: item.publicIdentifier }),
      ...options,
      maxPages: 100,
      entityName: 'profiles',
    });
  }

  async scrapePosts({
    query,
    ...options
  }: {
    query: SearchPostsParams;
  } & ListingScraperConfig) {
    new ListingScraper<PostShort, PostShort>({
      fetchList: ({ page }) => this.searchPosts({ ...query, page }),
      fetchItem: async ({ item }) => ({ id: item.id, element: item }) as ApiItemResponse<PostShort>,
      ...options,
      maxPages: 100,
      entityName: 'posts',
      skipItemRequestsStats: true,
    });
  }
}
