import { BaseScraper, ScraperOptions } from '../scraper';
import {
  ApiItemResponse,
  ApiListResponse,
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
}
