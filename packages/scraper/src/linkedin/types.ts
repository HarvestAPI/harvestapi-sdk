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
  companyId?: string | string[];
  location?: string;
  geoId?: string;
  sortBy?: 'date' | 'relevance';
  workplaceType?: ('office' | 'hybrid' | 'remote')[];
  employmentType?: ('full-time' | 'part-time' | 'contract' | 'internship')[];
  postedLimit?: '24h' | 'week' | 'month';
  page?: number;
  salary?: SalaryRange | SalaryRange[];
};

export type SearchPostsParams = {
  search?: string;
  page?: number;
  sortBy?: 'date' | 'relevance';
  postedLimit?: '24h' | 'week' | 'month';
  companyId?: string;
  profileId?: string;
};

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

export interface ProfileShort {
  id?: string;
  publicIdentifier: string;
  name?: string;
  position?: string;
  location?: {
    linkedinText?: string;
  };
  url?: string;
  photo?: string;
  hidden?: boolean;
}

export interface Company {
  id?: string;
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
}

export interface CompanyShort {
  id?: string;
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
}

export interface Job {
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
}

export interface JobShort {
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
}

interface AuthorAvatar {
  url: string;
  width: number;
  height: number;
  expiresAt: number;
}

interface PostImage {
  url: string;
  width: number;
  height: number;
  expiresAt: number;
}

interface Reaction {
  type: string;
  count: number;
}

interface Engagement {
  likes: number;
  comments: number;
  shares: number;
  reactions: Reaction[];
}

interface SocialContent {
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
}

export interface PostShort {
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
  authorAvatar?: AuthorAvatar;
  postedAgo?: string;
  postImage?: PostImage;
  repostId?: string | null;
  repost?: PostShort;
  newsletterUrl?: string;
  newsletterTitle?: string;
  socialContent?: SocialContent;
  engagement?: Engagement;
}
