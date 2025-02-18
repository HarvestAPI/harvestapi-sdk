import { BaseScraper, ScraperOptions } from '../scraper';
import {
  ApiItemResponse,
  ApiListResponse,
  GetCompanyParams,
  GetJobParams,
  GetLinkedInProfileParams,
  Profile,
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
  async getProfile(
    params: GetLinkedInProfileParams,
  ): Promise<ApiItemResponse<Profile, GetLinkedInProfileParams>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile', params });
  }

  async searchProfiles(
    params: SearchLinkedInProfilesParams,
  ): Promise<ApiListResponse<Profile, SearchLinkedInProfilesParams>> {
    return this.scraper.fetchApi({ path: 'linkedin/profile-search', params });
  }

  async getCompany(params: GetCompanyParams): Promise<ApiItemResponse<Profile, GetCompanyParams>> {
    return this.scraper.fetchApi({ path: 'linkedin/company', params });
  }

  async searchCompanies(
    params: SearchCompaniesParams,
  ): Promise<ApiListResponse<Profile, SearchCompaniesParams>> {
    return this.scraper.fetchApi({ path: 'linkedin/company-search', params });
  }

  async getJob(params: GetJobParams): Promise<ApiItemResponse<Profile, GetJobParams>> {
    return this.scraper.fetchApi({ path: 'linkedin/job', params });
  }

  async searchJobs(params: SearchJobsParams): Promise<ApiListResponse<Profile, SearchJobsParams>> {
    return this.scraper.fetchApi({ path: 'linkedin/job-search', params });
  }

  async searchPosts(
    params: SearchPostsParams,
  ): Promise<ApiListResponse<Profile, SearchPostsParams>> {
    return this.scraper.fetchApi({ path: 'linkedin/post-search', params });
  }

  async test() {
    return this.scraper.fetchApi({ path: 'linkedin/test' });
  }
}
