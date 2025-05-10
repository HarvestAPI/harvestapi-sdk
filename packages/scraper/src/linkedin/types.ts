import { ListingScraperConfig } from '../base';

export interface GetLinkedInProfileParams {
  url?: string;
  publicIdentifier?: string;
  profileId?: string;
  tryFindEmail?: boolean;
}

export interface SearchLinkedInProfilesParams {
  company?: string | string[];
  companyId?: string | string[];
  companyUniversalName?: string | string[];
  school?: string | string[];
  schoolId?: string | string[];
  schoolUniversalName?: string | string[];
  geoId?: string | string[];
  location?: string | string[];
  search?: string;
  page?: number;
}

export interface GetLinkedinCompanyParams {
  universalName?: string;
  url?: string;
  companyId?: string;
}

export type LinkedinCompanySize =
  | '1-10'
  | '11-50'
  | '51-200'
  | '201-500'
  | '501-1000'
  | '1001-5000'
  | '5001-10000'
  | '10001+';

export interface SearchLinkedinCompaniesParams {
  geoId?: string;
  location?: string;
  search?: string;
  page?: number;
  companySize?: LinkedinCompanySize;
}

export interface GetLinkedinJobParams {
  jobId?: string;
  url?: string;
  withCompany?: boolean;
}

export type LinkedinSalaryRange =
  | '40k+'
  | '60k+'
  | '80k+'
  | '100k+'
  | '120k+'
  | '140k+'
  | '160k+'
  | '180k+'
  | '200k+';

export type LinkedinJobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type LinkedinWorkplaceType = 'office' | 'hybrid' | 'remote';

export interface SearchLinkedinJobsParams {
  search?: string;
  companyId?: string | string[];
  companyUniversalName?: string | string[];
  location?: string;
  geoId?: string;
  sortBy?: 'date' | 'relevance';
  workplaceType?: LinkedinWorkplaceType | LinkedinWorkplaceType[];
  employmentType?: LinkedinJobType | LinkedinJobType[];
  postedLimit?: '24h' | 'week' | 'month';
  page?: number;
  salary?: LinkedinSalaryRange | LinkedinSalaryRange[];
}

export interface SearchLinkedinPostsParams {
  search?: string;
  page?: number;
  sortBy?: 'date' | 'relevance';
  postedLimit?: '24h' | 'week' | 'month';
  targetUrl?: string | string[];
  profile?: string | string[];
  companyId?: string | string[];
  profileId?: string | string[];
  company?: string | string[];
  companyUniversalName?: string | string[];
  profilePublicIdentifier?: string | string[];
  authorsCompany?: string | string[];
  authorsCompanyUniversalName?: string | string[];
  authorsCompanyId?: string | string[];
}

export type Profile = {
  id: string;
  publicIdentifier: string;
  lastName: string;
  firstName: string;
  headline: string;
  about: string;
  linkedinUrl: string;
  photo: string;
  emails: string[];
  websites: string[];
  registeredAt: string;
  topSkills: string;
  connectionsCount: number;
  followerCount: number;
  openToWork: boolean;
  hiring: boolean;
  location: {
    linkedinText: string;
    countryCode: string;
    parsed: {
      text: string;
      countryCode: string;
      regionCode: string | null;
      country: string;
      countryFull: string;
      state: string;
      city: string;
    };
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
    startDate: { text: string; month?: string; year?: number } | null;
    endDate: { text: string; month?: string; year?: number } | null;
    employmentType: string;
  }>;
  education: Array<{
    title: string;
    link: string;
    degree: string;
    startDate: { text: string; month?: string; year?: number } | null;
    endDate: { text: string; month?: string; year?: number } | null;
  }>;
  certifications: Array<{
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
    startDate: { text: string; month?: string; year?: number } | null;
    endDate: { text: string; month?: string; year?: number } | null;
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
};

export type ProfileShort = {
  id: string;
  publicIdentifier: string;
  name?: string;
  position?: string;
  location?: {
    linkedinText?: string;
  };
  linkedinUrl?: string;
  photo?: string;
  hidden?: boolean;
};

export type Company = {
  id: string;
  universalName: string;
  name?: string;
  tagline?: string;
  website?: string;
  linkedinUrl?: string;
  logo?: string;
  foundedOn?: {
    month?: string | null;
    year?: number;
    day?: string | null;
  };
  employeeCount?: number;
  employeeCountRange?: {
    start?: number;
    end?: number;
  };
  followerCount?: number;
  description?: string;
  headquarter?: {
    geographicArea?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    line2?: string | null;
    line1?: string;
    description?: string;
    parsed?: {
      text?: string;
      countryCode?: string;
      regionCode?: string | null;
      country?: string;
      countryFull?: string;
      state?: string;
      city?: string;
    };
  };
  locations?: Array<{
    localizedName?: string;
    headquarter?: boolean;
    description?: string | null;
    country?: string;
    geographicArea?: string;
    city?: string;
    postalCode?: string | null;
    line2?: string | null;
    line1?: string;
  }>;
  specialities?: string[];
  industries?: string[];
  logos?: Array<{
    url?: string;
    width?: number;
    height?: number;
    expiresAt?: number;
  }>;
  backgroundCovers?: Array<{
    url?: string;
    width?: number;
    height?: number;
    expiresAt?: number;
  }>;
  active?: boolean;
  jobSearchUrl?: string;
  phone?: string | null;
  crunchbaseFundingData?: {
    numberOfFundingRounds?: number;
    lastFundingRound?: {
      localizedFundingType?: string;
      leadInvestors?: Array<Record<string, never>>; // Empty object type
      moneyRaised?: {
        amount?: string;
        currencyCode?: string;
      };
      fundingRoundUrl?: string;
      announcedOn?: {
        month?: number;
        year?: number;
        day?: number;
      };
      numberOfOtherInvestors?: number;
      investorsUrl?: string;
    };
    organizationUrl?: string;
    updatedAt?: number;
    fundingRoundsUrl?: string;
  };
  pageVerified?: boolean;
};

export type CompanyShort = {
  id: string;
  universalName: string;
  linkedinUrl: string;
  name?: string;
  industries?: string;
  location?: {
    linkedinText?: string;
  };
  followers?: string;
  summary?: string;
  logo?: string;
};

export type Job = {
  id: string;
  title?: string;
  url?: string;
  jobState?: string;
  postedDate?: string; // ISO 8601 date-time string
  descriptionText?: string;
  descriptionHtml?: string;
  location?: {
    linkedinText?: string;
    postalAddress?: string | null;
    parsed?: {
      text?: string;
      countryCode?: string;
      regionCode?: string | null;
      country?: string;
      countryFull?: string;
      state?: string;
      city?: string;
    };
  };
  employmentType?: 'full_time' | 'part_time' | 'contract' | 'internship';
  workplaceType?: 'on_site' | 'hybrid' | 'remote';
  workRemoteAllowed?: boolean;
  easyApplyUrl?: string;
  applicants?: number;
  company: Company;
  salary: {
    text: string;
    min: number;
    max: number;
    currency: string;
    payPeriod: string;
    compensationType: string;
    compensationSource: string;
    providedByEmployer: boolean;
  } | null;
  views?: number;
  expireAt?: string; // ISO 8601 date-time string
  new?: boolean;
  jobApplicationLimitReached?: boolean;
  applicantTrackingSystem?: string;
};

export type JobShort = {
  id: string;
  url?: string;
  title?: string;
  postedDate?: string; // ISO 8601 date-time string
  company?: CompanyShort;
  location?: {
    linkedinText?: string;
  };
  easyApply?: boolean;
};

export type PostShort = {
  id: string;
  content?: string;
  author: {
    universalName?: string | null;
    publicIdentifier?: string | null;
    type?: 'company' | 'profile';
    name?: string;
    linkedinUrl?: string;
    info?: string;
    website?: string | null;
    websiteLabel?: string | null;
    avatar?: {
      url: string;
      width: number;
      height: number;
      expiresAt: number;
    };
  };
  article: {
    title: string | null;
    subtitle: string | null;
    link: string | null;
    linkLabel: string | null;
    description: string | null;
    image: string | null;
  } | null;
  postedAgo?: string;
  postImages?: {
    url: string;
    width: number;
    height: number;
    expiresAt: number;
  }[];
  repostId?: string | null;
  repost?: PostShort;
  repostedBy?: {
    name: string;
    publicIdentifier: string;
    linkedinUrl: string;
  };
  newsletterUrl?: string;
  newsletterTitle?: string;
  socialContent?: {
    hideCommentsCount: boolean;
    hideReactionsCount: boolean;
    hideSocialActivityCounts: boolean;
    hideShareAction: boolean;
    hideSendAction: boolean;
    hideRepostsCount: boolean;
    hideViewsCount: boolean;
    hideReactAction: boolean;
    hideCommentAction: boolean;
    shareUrl: string;
    showContributionExperience: boolean;
    showSocialDetail: boolean;
  };
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    reactions: {
      type: string;
      count: number;
    }[];
  };
};

export type ScrapeLinkedinJobsParams = {
  query: SearchLinkedinJobsParams;
} & ListingScraperConfig<JobShort, Job>;

export type ScrapeLinkedinCompaniesParams = {
  query: SearchLinkedinCompaniesParams;
} & ListingScraperConfig<CompanyShort, Company>;

export type ScrapeLinkedinProfilesParams = {
  query: SearchLinkedInProfilesParams;
  tryFindEmail?: boolean;
} & ListingScraperConfig<ProfileShort, Profile>;

export type ScrapeLinkedinPostsParams = {
  query: SearchLinkedinPostsParams;
} & ListingScraperConfig<PostShort, PostShort>;

export type ErrorResponse = {
  error: string;
  message: string;
  status: number;
};
