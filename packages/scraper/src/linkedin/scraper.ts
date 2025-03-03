import { BaseScraper, ScraperOptions } from '../base';
import { ListingScraper } from '../base/listing.scraper';
import { ApiItemResponse, ApiListResponse } from '../types';
import {
  Company,
  CompanyShort,
  GetLinkedinCompanyParams,
  GetLinkedinJobParams,
  GetLinkedInProfileParams,
  Job,
  JobShort,
  PostShort,
  Profile,
  ProfileShort,
  ScrapeLinkedinCompaniesParams,
  ScrapeLinkedinJobsParams,
  ScrapeLinkedinPostsParams,
  ScrapeLinkedinProfilesParams,
  SearchLinkedinCompaniesParams,
  SearchLinkedinJobsParams,
  SearchLinkedinPostsParams,
  SearchLinkedInProfilesParams,
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
          ? ({ id: item?.id, element: item } as ApiItemResponse<PostShort>)
          : { skipped: true },
      scrapeDetails: false,
      entityName: 'posts',
      ...options,
      maxPages: 100,
    }).scrapeStart();
  }

  /** @internal */
  async test() {
    return this.scraper.fetchApi({ path: 'linkedin/test' });
  }
}
