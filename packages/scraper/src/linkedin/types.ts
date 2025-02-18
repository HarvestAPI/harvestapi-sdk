export interface Profile {
  id: string;
  publicIdentifier: string;
  lastName: string;
  firstName: string;
  headline: string;
  about: string;
  linkedinUrl: string;
  photo: string;
  registeredAt: string;
  topSkills: string;
  connectionsCount: number;
  followerCount: number;
  openToWork: boolean;
  hiring: boolean;
  location: {
    preferredGeoPlace: string | null;
    countryCode: string;
    postalCode: string | null;
    country: string;
    countryFull: string;
  };
  currentPosition: Array<{
    companyName: string;
  }>;
  experience: Array<{
    companyName: string;
    duration: string;
    position: string;
    location: string;
    companyLink: string;
    description: string;
    startDate: string;
    endDate: string;
    employmentType: string;
  }>;
  education: Array<{
    title: string;
    link: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  certificates: Array<{
    title: string;
    issuedAt: string;
    issuedBy: string;
    issuedByLink: string;
  }>;
  receivedRecommendations: Array<{
    givenBy: string;
    givenAt: string;
    givenByLink: string;
    description: string;
  }>;
  skills: Array<{
    name: string;
  }>;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
  }>;
  publications: Array<{
    title: string;
    publishedAt: string;
    description: string;
    link: string;
  }>;
  featured: {
    images: string[];
    link: string;
    title: string;
    subtitle: string;
  };
  verified: boolean;
}

export interface ApiItemResponse<TItem, TQuery> {
  id: string | null;
  element: TItem;
  status: string;
  error: any;
  query: TQuery;
}

export interface ApiListResponse<TItem, TQuery> {
  id: string | null;
  pagination: {
    totalPages: number;
    totalElements: number;
    pageNumber: number;
    previousElements: number;
    pageSize: number;
  } | null;
  elements: TItem;
  status: string;
  error: any;
  query: TQuery;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
}

export type GetLinkedInProfileParams = {
  url?: string;
  publicIdentifier?: string;
  profileId?: string;
};

export type SearchLinkedInProfilesParams = {
  companyId?: string;
  geoId?: string;
  location?: string;
  search?: string;
  page?: number;
};

export type GetCompanyParams = {
  universalName?: string;
  url?: string;
  companyId?: string | null;
};

export type CompanySize =
  | '1-10'
  | '11-50'
  | '51-200'
  | '201-500'
  | '501-1000'
  | '1001-5000'
  | '5001-10000'
  | '10001+';

export type SearchCompaniesParams = {
  geoId?: string;
  location?: string;
  search?: string;
  page?: number;
  companySize?: CompanySize;
};

export type GetJobParams = {
  jobId?: string;
  url?: string;
};

export type SalaryRange =
  | '40k+'
  | '60k+'
  | '80k+'
  | '100k+'
  | '120k+'
  | '140k+'
  | '160k+'
  | '180k+'
  | '200k+';

export type SearchJobsParams = {
  search?: string;
  companyId?: string;
  location?: string;
  geoId?: string;
  sortBy?: 'date' | 'relevance';
  workplaceType?: ('office' | 'hybrid' | 'remote')[];
  employmentType?: ('full-time' | 'part-time' | 'contract' | 'internship')[];
  postedLimit?: '24h' | 'week' | 'month';
  page?: number;
  geoTitle?: string;
  salary?: SalaryRange;
};

export type SearchPostsParams = {
  search?: string;
  page?: number;
  sortBy?: 'date' | 'relevance';
  postedLimit?: '24h' | 'week' | 'month';
  companyId?: string;
  profileId?: string;
};
