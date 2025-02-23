import { ListingScraperConfig } from '../base';

export interface GetLinkedInProfileParams {
  url?: string;
  publicIdentifier?: string;
  profileId?: string;
}

export interface SearchLinkedInProfilesParams {
  companyId?: string;
  geoId?: string;
  location?: string;
  search?: string;
  page?: number;
}

export interface GetLinkedinCompanyParams {
  universalName?: string;
  url?: string;
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
  companyId?: string;
  profileId?: string;
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
};

export type ProfileShort = {
  id: string;
  publicIdentifier: string;
  name?: string;
  position?: string;
  location?: {
    linkedinText?: string;
  };
  url?: string;
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
  logoUrl?: string;
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
  industry?: string[];
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
  name?: string;
  industry?: string;
  location?: {
    linkedinText?: string;
  };
  followers?: string;
  summary?: string;
  logo?: string;
  url?: string;
  universalName: string;
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
  companyName?: string;
  companyLogo?: string;
  companyLink?: string;
  companyUniversalName?: string;
  salaryText?: string;
  salaryMin?: string;
  salaryMax?: string;
  salaryCurrency?: string;
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
  companyName?: string;
  companyLink?: string;
  companyUniversalName?: string;
  location?: {
    linkedinText?: string;
  };
  easyApply?: boolean;
};

export type PostShort = {
  id: string;
  content?: string;
  title?: string;
  subtitle?: string;
  link?: string;
  linkLabel?: string;
  description?: string;
  authorUniversalName?: string | null;
  authorPublicIdentifier?: string | null;
  authorType?: 'company' | 'profile';
  authorName?: string;
  authorLinkedinUrl?: string;
  authorPosition?: string;
  authorWebsite?: string | null;
  authorWebsiteLabel?: string | null;
  authorAvatar?: {
    url: string;
    width: number;
    height: number;
    expiresAt: number;
  };
  postedAgo?: string;
  postImage?: {
    url: string;
    width: number;
    height: number;
    expiresAt: number;
  };
  repostId?: string | null;
  repost?: PostShort;
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
} & ListingScraperConfig;

export type ScrapeLinkedinCompaniesParams = {
  query: SearchLinkedinCompaniesParams;
} & ListingScraperConfig;

export type ScrapeLinkedinProfilesParams = {
  query: SearchLinkedInProfilesParams;
} & ListingScraperConfig;

export type ScrapeLinkedinPostsParams = {
  query: SearchLinkedinPostsParams;
} & ListingScraperConfig;

export type ErrorResponse = {
  error: string;
  message: string;
  status: number;
};
