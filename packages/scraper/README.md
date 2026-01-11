# HarvestAPI scraping tools

HarvestAPI provides LinkedIn data scraping tools for real-time, high-performance scraping at a low cost.  
API allows to search for Linkedin `jobs`, `companies`, `profiles`, and `posts` using a wide range of filters.

## Installation

```bash
npm install @harvestapi/scraper
```

## Usage examples

### Search for specific items.

To search for specific items, such as job listings, you can use the searchJobs method. Below is an example of how to search for job listings and retrieve details for a specific job:

```JavaScript
import { createLinkedinScraper } from '@harvestapi/scraper';

// Initialize the scraper with your API key
const scraper = createLinkedinScraper({
  apiKey: 'your-api-key', // Replace with your HarvestAPI key. Obtain it at https://harvest-api.com/admin/api-keys
});

(async () => {
  const jobs = await scraper.searchJobs({
    search: 'software engineer', // Job title to search for
    location: 'California', // Location filter
    page: 1,  // Page number to retrieve
  });
  console.log(`jobs`, JSON.stringify(jobs, null, 2));

  const jobDetails = await scraper.getJob({
    jobId: jobs.elements[0].id, // Use the job ID from the search results
  });
  console.log(`jobDetails`, JSON.stringify(jobDetails, null, 2));
})();
```

### Scraping All Search Pages and Saving Data

The scrape methods allows you to scrape all pages of search results and save the data either to a SQLite database or a JSON file. This method automatically handles pagination and will scrape all available pages based on the `totalPages` metadata.
After fetching a page, the scraper will also make a separate request per each item, to fetch its details (default behavior).

1. Optionally install SQLite (if you want to save data to SQLite):

```bash
npm i sqlite sqlite3
```

2. Use the `scrapeJobs`, `scrapeCompanies`, `scrapeProfiles`, or `scrapePosts` methods to scrape data and save it to a SQLite database or JSON file.

```JavaScript
await scraper.scrapeProfiles({
  query: {
    search: 'Mark',
    companyId: '1441', // Google company id.
    location: 'US',
  },
  outputType: 'sqlite',
});
```

If you you want make requests to only fetch search pages, without fetching item details, you can pass `scrapeDetails: false` option to the scrape method. For example `scrapeJobs` will not fetch job descriptions in this case, but you will get job title, links and some other basic info (check JobShort below).

After the scraping process is complete, you can view the data using any SQLite database browser. The data will be saved in a file located at `./output/{timestamp}_profiles_{id}.{sqlite|json}`.

## API Reference

For more detailed information on the available methods and their parameters, check the API reference below


### createLinkedinScraper()

> **createLinkedinScraper**(`options`): [`LinkedinScraper`](#linkedinscraper)

#### Parameters

##### options

[`ScraperOptions`](#scraperoptions)

#### Returns

[`LinkedinScraper`](#linkedinscraper)

***

### createConcurrentQueues()

> **createConcurrentQueues**\<`TArgs`, `TRes`\>(`concurrency`, `fn`, `opts`?): `AsyncFunction`\<`TArgs`, `TRes`\>

#### Type Parameters

• **TArgs** *extends* `any`[] = `any`[]

• **TRes** = `any`

#### Parameters

##### concurrency

`number`

##### fn

`AsyncFunction`\<`TArgs`, `TRes`\>

##### opts?

[`CreateConcurrentQueuesOptions`](#createconcurrentqueuesoptions)

#### Returns

`AsyncFunction`\<`TArgs`, `TRes`\>

***

### createConcurrentQueuesPerKey()

> **createConcurrentQueuesPerKey**\<`TArgs`, `TRes`\>(`keyGetter`, `queuesNumber`, `fn`, `opts`?): `AsyncFunction`\<`TArgs`, `TRes`\>

#### Type Parameters

• **TArgs** *extends* `any`[]

• **TRes** = `any`

#### Parameters

##### keyGetter

(...`args`) => `string`

##### queuesNumber

`number`

##### fn

`AsyncFunction`\<`TArgs`, `TRes`\>

##### opts?

[`CreateConcurrentQueuesOptions`](#createconcurrentqueuesoptions)

#### Returns

`AsyncFunction`\<`TArgs`, `TRes`\>

## Classes

### LinkedinScraper

#### Methods

##### getProfile()

> **getProfile**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Profile`](#profile-4)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedInProfileParams`](#getlinkedinprofileparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Profile`](#profile-4)\>\>

##### getProfileId()

> **getProfileId**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<\{ `id`: `string`; \}\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & `object`

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<\{ `id`: `string`; \}\>\>

##### searchProfiles()

> **searchProfiles**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileShort`](#profileshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`SearchLinkedInProfilesParams`](#searchlinkedinprofilesparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileShort`](#profileshort)\>\>

##### getCompany()

> **getCompany**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Company`](#company-5)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinCompanyParams`](#getlinkedincompanyparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Company`](#company-5)\>\>

##### searchCompanies()

> **searchCompanies**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`CompanyShort`](#companyshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`SearchLinkedinCompaniesParams`](#searchlinkedincompaniesparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`CompanyShort`](#companyshort)\>\>

##### getJob()

> **getJob**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Job`](#job)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinJobParams`](#getlinkedinjobparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Job`](#job)\>\>

##### searchJobs()

> **searchJobs**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`JobShort`](#jobshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`SearchLinkedinJobsParams`](#searchlinkedinjobsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`JobShort`](#jobshort)\>\>

##### searchPosts()

> **searchPosts**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostShort`](#postshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`SearchLinkedinPostsParams`](#searchlinkedinpostsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostShort`](#postshort)\>\>

##### getProfilePosts()

> **getProfilePosts**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostShort`](#postshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetProfilePostsParams`](#getprofilepostsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostShort`](#postshort)\>\>

##### getCompanyPosts()

> **getCompanyPosts**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostShort`](#postshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetCompanyPostsParams`](#getcompanypostsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostShort`](#postshort)\>\>

##### getPost()

> **getPost**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`PostShort`](#postshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinPostParams`](#getlinkedinpostparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`PostShort`](#postshort)\>\>

##### getPostReactions()

> **getPostReactions**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostReaction`](#postreaction)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinPostReactionsParams`](#getlinkedinpostreactionsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostReaction`](#postreaction)\>\>

##### getPostComments()

> **getPostComments**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostComment`](#postcomment)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinPostCommentsParams`](#getlinkedinpostcommentsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostComment`](#postcomment)\>\>

##### getCommentReactions()

> **getCommentReactions**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostReaction`](#postreaction)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinPostCommentReactionsParams`](#getlinkedinpostcommentreactionsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostReaction`](#postreaction)\>\>

##### getProfileComments()

> **getProfileComments**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostComment`](#postcomment)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinProfileCommentsParams`](#getlinkedinprofilecommentsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostComment`](#postcomment)\>\>

##### getProfileReactions()

> **getProfileReactions**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileReaction`](#profilereaction)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinProfileReactionsParams`](#getlinkedinprofilereactionsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileReaction`](#profilereaction)\>\>

##### scrapeJobs()

> **scrapeJobs**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinJobsParams`](#scrapelinkedinjobsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapeCompanies()

> **scrapeCompanies**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinCompaniesParams`](#scrapelinkedincompaniesparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapeProfiles()

> **scrapeProfiles**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinProfilesParams`](#scrapelinkedinprofilesparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapePosts()

> **scrapePosts**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinPostsParams`](#scrapelinkedinpostsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapePostReactions()

> **scrapePostReactions**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinPostReactionsParams`](#scrapelinkedinpostreactionsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapePostComments()

> **scrapePostComments**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinPostCommentsParams`](#scrapelinkedinpostcommentsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapeProfileComments()

> **scrapeProfileComments**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinProfileCommentsParams`](#scrapelinkedinprofilecommentsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapeProfileReactions()

> **scrapeProfileReactions**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinProfileReactionsParams`](#scrapelinkedinprofilereactionsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### searchSalesNavigatorLeads()

> **searchSalesNavigatorLeads**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileShort`](#profileshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`SearchLinkedInSalesNavLeadsParams`](#searchlinkedinsalesnavleadsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileShort`](#profileshort)\>\>

##### scrapeSalesNavigatorLeads()

> **scrapeSalesNavigatorLeads**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinSalesNavLeadsParams`](#scrapelinkedinsalesnavleadsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### getGroup()

> **getGroup**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<\{ `name`: `string`; `url`: `string`; \}\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & `object`

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<\{ `name`: `string`; `url`: `string`; \}\>\>

##### searchGroups()

> **searchGroups**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<\{ `name`: `string`; `url`: `string`; \}\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & `object`

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<\{ `name`: `string`; `url`: `string`; \}\>\>

##### searchServices()

> **searchServices**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileServiceShort`](#profileserviceshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`SearchLinkedinServicesParams`](#searchlinkedinservicesparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileServiceShort`](#profileserviceshort)\>\>

##### scrapeServices()

> **scrapeServices**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinServicesParams`](#scrapelinkedinservicesparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### searchAds()

> **searchAds**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`LinkedinAdShort`](#linkedinadshort)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`SearchLinkedinAdsParams`](#searchlinkedinadsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`LinkedinAdShort`](#linkedinadshort)\>\>

##### getAd()

> **getAd**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`LinkedInAd`](#linkedinad)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinAdParams`](#getlinkedinadparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`LinkedInAd`](#linkedinad)\>\>

## Interfaces

### BaseFetchParams

#### Properties

##### addHeaders?

> `optional` **addHeaders**: `Record`\<`string`, `string`\>

##### cookie?

> `optional` **cookie**: `string`

##### proxy?

> `optional` **proxy**: `string`

##### userAgent?

> `optional` **userAgent**: `string`

##### sessionId?

> `optional` **sessionId**: `string`

***

### GetLinkedInProfileParams

#### Properties

##### url?

> `optional` **url**: `string`

##### publicIdentifier?

> `optional` **publicIdentifier**: `string`

##### profileId?

> `optional` **profileId**: `string`

##### query?

> `optional` **query**: `string`

##### findEmail?

> `optional` **findEmail**: `boolean`

##### skipSmtp?

> `optional` **skipSmtp**: `boolean`

##### main?

> `optional` **main**: `boolean`

***

### SearchLinkedInProfilesParams

#### Properties

##### currentCompany?

> `optional` **currentCompany**: `string` \| `string`[]

##### currentCompanyId?

> `optional` **currentCompanyId**: `string` \| `string`[]

##### currentCompanyUniversalName?

> `optional` **currentCompanyUniversalName**: `string` \| `string`[]

##### pastCompany?

> `optional` **pastCompany**: `string` \| `string`[]

##### pastCompanyId?

> `optional` **pastCompanyId**: `string` \| `string`[]

##### pastCompanyUniversalName?

> `optional` **pastCompanyUniversalName**: `string` \| `string`[]

##### school?

> `optional` **school**: `string` \| `string`[]

##### schoolId?

> `optional` **schoolId**: `string` \| `string`[]

##### schoolUniversalName?

> `optional` **schoolUniversalName**: `string` \| `string`[]

##### geoId?

> `optional` **geoId**: `string` \| `string`[]

##### location?

> `optional` **location**: `string` \| `string`[]

##### industryId?

> `optional` **industryId**: `string` \| `string`[]

##### search?

> `optional` **search**: `string`

##### title?

> `optional` **title**: `string`

##### firstName?

> `optional` **firstName**: `string`

##### lastName?

> `optional` **lastName**: `string`

##### keywordsCompany?

> `optional` **keywordsCompany**: `string`

##### keywordsSchool?

> `optional` **keywordsSchool**: `string`

##### page?

> `optional` **page**: `number`

***

### SearchLinkedInSalesNavLeadsParams

#### Properties

##### currentCompanies?

> `optional` **currentCompanies**: `string` \| `string`[]

##### pastCompanies?

> `optional` **pastCompanies**: `string` \| `string`[]

##### schools?

> `optional` **schools**: `string` \| `string`[]

##### locations?

> `optional` **locations**: `string` \| `string`[]

##### geoIds?

> `optional` **geoIds**: `string` \| `string`[]

##### search?

> `optional` **search**: `string`

##### page?

> `optional` **page**: `number`

##### salesNavUrl?

> `optional` **salesNavUrl**: `string`

##### currentJobTitles?

> `optional` **currentJobTitles**: `string` \| `string`[]

##### pastJobTitles?

> `optional` **pastJobTitles**: `string` \| `string`[]

##### firstNames?

> `optional` **firstNames**: `string` \| `string`[]

##### lastNames?

> `optional` **lastNames**: `string` \| `string`[]

##### industryIds?

> `optional` **industryIds**: `string` \| `string`[]

##### yearsAtCurrentCompanyIds?

> `optional` **yearsAtCurrentCompanyIds**: `string` \| `string`[]

Map:
{
 "1": "Less than 1 year",
 "2": "1 to 2 years",
 "3": "3 to 5 years",
 "4": "6 to 10 years",
 "5": "More than 10 years"
}

##### yearsOfExperienceIds?

> `optional` **yearsOfExperienceIds**: `string` \| `string`[]

Map:
{
 "1": "Less than 1 year",
 "2": "1 to 2 years",
 "3": "3 to 5 years",
 "4": "6 to 10 years",
 "5": "More than 10 years"
}

##### seniorityLevelIds?

> `optional` **seniorityLevelIds**: `string` \| `string`[]

Map: {
"100": "In Training",
"110": "Entry Level",
"120": "Senior",
"130": "Strategic",
"200": "Entry Level Manager",
"210": "Experienced Manager",
"220": "Director",
"300": "Vice President",
"310": "CXO",
"320": "Owner / Partner"
}

##### functionIds?

> `optional` **functionIds**: `string` \| `string`[]

Map:
{
"1": "Accounting",
"2": "Administrative",
"3": "Arts and Design",
"4": "Business Development",
"5": "Community and Social Services",
"6": "Consulting",
"7": "Education",
"8": "Engineering",
"9": "Entrepreneurship",
"10": "Finance",
"11": "Healthcare Services",
"12": "Human Resources",
"13": "Information Technology",
"14": "Legal",
"15": "Marketing",
"16": "Media and Communication",
"17": "Military and Protective Services",
"18": "Operations",
"19": "Product Management",
"20": "Program and Project Management",
"21": "Purchasing",
"22": "Quality Assurance",
"23": "Real Estate",
"24": "Research",
"25": "Sales",
"26": "Customer Success and Support"
}

##### recentlyChangedJobs?

> `optional` **recentlyChangedJobs**: `boolean`

##### profileLanguages?

> `optional` **profileLanguages**: `string` \| `string`[]

Map:
{
"ar": "Arabic",
"en": "English",
"es": "Spanish",
"pt": "Portuguese",
"zh": "Chinese",
"fr": "French",
"it": "Italian",
"ru": "Russian",
"de": "German",
"nl": "Dutch",
"tr": "Turkish",
"tl": "Tagalog",
"pl": "Polish",
"ko": "Korean",
"ja": "Japanese",
"ms": "Malay",
"no": "Norwegian",
"da": "Danish",
"ro": "Romanian",
"sv": "Swedish",
"in": "Bahasa Indonesia",
"cs": "Czech"
}

##### excludeCurrentCompanies?

> `optional` **excludeCurrentCompanies**: `string` \| `string`[]

##### excludePastCompanies?

> `optional` **excludePastCompanies**: `string` \| `string`[]

##### excludeLocations?

> `optional` **excludeLocations**: `string` \| `string`[]

##### excludeGeoIds?

> `optional` **excludeGeoIds**: `string` \| `string`[]

##### excludeSchools?

> `optional` **excludeSchools**: `string` \| `string`[]

##### excludeCurrentJobTitles?

> `optional` **excludeCurrentJobTitles**: `string`[]

##### excludePastJobTitles?

> `optional` **excludePastJobTitles**: `string`[]

##### excludeIndustryIds?

> `optional` **excludeIndustryIds**: `string` \| `string`[]

##### excludeSeniorityLevelIds?

> `optional` **excludeSeniorityLevelIds**: `string` \| `string`[]

##### excludeFunctionIds?

> `optional` **excludeFunctionIds**: `string` \| `string`[]

***

### SearchLinkedinServicesParams

#### Properties

##### search?

> `optional` **search**: `string`

##### page?

> `optional` **page**: `number`

##### location?

> `optional` **location**: `string`

##### geoId?

> `optional` **geoId**: `string`

***

### GetLinkedinCompanyParams

#### Properties

##### universalName?

> `optional` **universalName**: `string`

##### url?

> `optional` **url**: `string`

##### companyId?

> `optional` **companyId**: `string`

##### search?

> `optional` **search**: `string`

##### query?

> `optional` **query**: `string`

##### location?

> `optional` **location**: `string`

***

### SearchLinkedinAdsParams

#### Properties

##### searchUrl?

> `optional` **searchUrl**: `string`

##### accountOwner?

> `optional` **accountOwner**: `null` \| `string`

##### keyword?

> `optional` **keyword**: `null` \| `string`

##### countries?

> `optional` **countries**: `null` \| `string` \| `string`[]

##### dateOption?

> `optional` **dateOption**: `null` \| `"last-30-days"` \| `"current-month"` \| `"current-year"` \| `"last-year"` \| `"custom-date-range"`

##### startdate?

> `optional` **startdate**: `null` \| `string`

##### enddate?

> `optional` **enddate**: `null` \| `string`

##### paginationToken?

> `optional` **paginationToken**: `null` \| `string`

***

### GetLinkedinAdParams

#### Properties

##### adId?

> `optional` **adId**: `string`

##### url?

> `optional` **url**: `string`

***

### SearchLinkedinCompaniesParams

#### Properties

##### geoId?

> `optional` **geoId**: `string`

##### location?

> `optional` **location**: `string`

##### search?

> `optional` **search**: `string`

##### page?

> `optional` **page**: `number`

##### companySize?

> `optional` **companySize**: [`LinkedinCompanySize`](#linkedincompanysize) \| [`LinkedinCompanySize`](#linkedincompanysize)[]

##### industryId?

> `optional` **industryId**: `string` \| `number` \| `string`[] \| `number`[]

***

### GetLinkedinJobParams

#### Properties

##### jobId?

> `optional` **jobId**: `string`

##### url?

> `optional` **url**: `string`

##### withCompany?

> `optional` **withCompany**: `boolean`

***

### SearchLinkedinJobsParams

#### Properties

##### search?

> `optional` **search**: `string`

##### company?

> `optional` **company**: `string` \| `string`[]

##### companyId?

> `optional` **companyId**: `string` \| `string`[]

##### companyUniversalName?

> `optional` **companyUniversalName**: `string` \| `string`[]

##### location?

> `optional` **location**: `string`

##### geoId?

> `optional` **geoId**: `string`

##### sortBy?

> `optional` **sortBy**: `"date"` \| `"relevance"`

##### workplaceType?

> `optional` **workplaceType**: [`LinkedinWorkplaceType`](#linkedinworkplacetype) \| [`LinkedinWorkplaceType`](#linkedinworkplacetype)[]

##### employmentType?

> `optional` **employmentType**: [`LinkedinJobType`](#linkedinjobtype) \| [`LinkedinJobType`](#linkedinjobtype)[]

##### experienceLevel?

> `optional` **experienceLevel**: [`ExperienceLevel`](#experiencelevel-1) \| [`ExperienceLevel`](#experiencelevel-1)[]

##### under10Applicants?

> `optional` **under10Applicants**: `boolean`

##### easyApply?

> `optional` **easyApply**: `boolean`

##### postedLimit?

> `optional` **postedLimit**: `"1h"` \| `"24h"` \| `"week"` \| `"month"`

##### page?

> `optional` **page**: `number`

##### salary?

> `optional` **salary**: [`LinkedinSalaryRange`](#linkedinsalaryrange) \| [`LinkedinSalaryRange`](#linkedinsalaryrange)[]

***

### SearchLinkedinPostsParams

#### Properties

##### search?

> `optional` **search**: `string`

##### page?

> `optional` **page**: `number`

##### sortBy?

> `optional` **sortBy**: `"date"` \| `"relevance"`

##### postedLimit?

> `optional` **postedLimit**: `"24h"` \| `"week"` \| `"month"`

##### targetUrl?

> `optional` **targetUrl**: `string` \| `string`[]

##### scrapePostedLimit?

> `optional` **scrapePostedLimit**: [`ScrapePostedLimitOptions`](#scrapepostedlimitoptions)

##### profile?

> `optional` **profile**: `string` \| `string`[]

##### companyId?

> `optional` **companyId**: `string` \| `string`[]

##### profileId?

> `optional` **profileId**: `string` \| `string`[]

##### company?

> `optional` **company**: `string` \| `string`[]

##### companyUniversalName?

> `optional` **companyUniversalName**: `string` \| `string`[]

##### profilePublicIdentifier?

> `optional` **profilePublicIdentifier**: `string` \| `string`[]

##### authorsCompany?

> `optional` **authorsCompany**: `string` \| `string`[]

##### authorsCompanyUniversalName?

> `optional` **authorsCompanyUniversalName**: `string` \| `string`[]

##### authorsCompanyId?

> `optional` **authorsCompanyId**: `string` \| `string`[]

##### group?

> `optional` **group**: `string`

##### paginationToken?

> `optional` **paginationToken**: `null` \| `string`

***

### GetProfilePostsParams

#### Properties

##### profile?

> `optional` **profile**: `string`

##### profileId?

> `optional` **profileId**: `string`

##### profilePublicIdentifier?

> `optional` **profilePublicIdentifier**: `string`

##### page?

> `optional` **page**: `number`

##### paginationToken?

> `optional` **paginationToken**: `string`

##### scrapePostedLimit?

> `optional` **scrapePostedLimit**: [`ScrapePostedLimitOptions`](#scrapepostedlimitoptions)

***

### GetCompanyPostsParams

#### Properties

##### company?

> `optional` **company**: `string`

##### companyId?

> `optional` **companyId**: `string`

##### companyUniversalName?

> `optional` **companyUniversalName**: `string`

##### page?

> `optional` **page**: `number`

##### paginationToken?

> `optional` **paginationToken**: `string`

##### scrapePostedLimit?

> `optional` **scrapePostedLimit**: [`ScrapePostedLimitOptions`](#scrapepostedlimitoptions)

***

### GetLinkedinPostParams

#### Properties

##### post?

> `optional` **post**: `string` \| `number`

##### targetUrl?

> `optional` **targetUrl**: `string`

***

### GetLinkedinPostReactionsParams

#### Properties

##### post

> **post**: `string` \| `number`

##### page?

> `optional` **page**: `number`

***

### GetLinkedinPostCommentReactionsParams

#### Properties

##### url

> **url**: `string` \| `number`

##### page?

> `optional` **page**: `number`

***

### GetLinkedinPostCommentsParams

#### Properties

##### post

> **post**: `string` \| `number`

##### page?

> `optional` **page**: `number`

##### paginationToken?

> `optional` **paginationToken**: `null` \| `string`

##### sortBy?

> `optional` **sortBy**: `"date"` \| `"relevance"`

##### postedLimit?

> `optional` **postedLimit**: `"24h"` \| `"week"` \| `"month"`

***

### GetLinkedinProfileCommentsParams

#### Properties

##### targetUrl?

> `optional` **targetUrl**: `string`

##### profile?

> `optional` **profile**: `string`

##### profileId?

> `optional` **profileId**: `string`

##### profilePublicIdentifier?

> `optional` **profilePublicIdentifier**: `string`

##### company?

> `optional` **company**: `string`

##### companyId?

> `optional` **companyId**: `string`

##### companyUniversalName?

> `optional` **companyUniversalName**: `string`

##### page?

> `optional` **page**: `number`

##### paginationToken?

> `optional` **paginationToken**: `null` \| `string`

##### postedLimit?

> `optional` **postedLimit**: `"24h"` \| `"week"` \| `"month"`

***

### GetLinkedinProfileReactionsParams

#### Properties

##### targetUrl?

> `optional` **targetUrl**: `string`

##### profile?

> `optional` **profile**: `string`

##### profileId?

> `optional` **profileId**: `string`

##### profilePublicIdentifier?

> `optional` **profilePublicIdentifier**: `string`

##### company?

> `optional` **company**: `string`

##### companyId?

> `optional` **companyId**: `string`

##### companyUniversalName?

> `optional` **companyUniversalName**: `string`

##### page?

> `optional` **page**: `number`

##### paginationToken?

> `optional` **paginationToken**: `null` \| `string`

***

### BaseApiResponse

#### Properties

##### entityId

> **entityId**: `null` \| `string`

##### requestId

> **requestId**: `string`

##### status

> **status**: `number`

##### error

> **error**: `any`

##### query

> **query**: `Record`\<`string`, `any`\>

##### originalQuery

> **originalQuery**: `Record`\<`string`, `any`\>

##### user?

> `optional` **user**: `object`

###### membershipTier

> **membershipTier**: `string`

###### requestsConcurrency

> **requestsConcurrency**: `number`

##### payments

> **payments**: `string`[]

##### cost

> **cost**: `number`

## Type Aliases

### ListingScraperConfig\<TItemShot, TItemDetails\>

> **ListingScraperConfig**\<`TItemShot`, `TItemDetails`\>: `object`

#### Type Parameters

• **TItemShot**

• **TItemDetails**

#### Type declaration

##### outputType?

> `optional` **outputType**: `"json"` \| `"sqlite"` \| `"callback"`

##### outputDir?

> `optional` **outputDir**: `string`

##### filename?

> `optional` **filename**: `string`

##### tableName?

> `optional` **tableName**: `string`

Table name for SQLite output.

##### scrapeDetails?

> `optional` **scrapeDetails**: `boolean`

Whether to make an additional request for each item details.

###### Default

```ts
true
```

##### keepScrapingIfAllSkippedOnPage?

> `optional` **keepScrapingIfAllSkippedOnPage**: `boolean`

Whether to keep scraping further pages if all items on the current page were skipped.

###### Default

```ts
false
```

##### onItemScraped()?

> `optional` **onItemScraped**: (`args`) => `any`

###### Parameters

###### args

`object` & `Partial`\<[`ApiItemResponse`](#apiitemresponsetitem)\<`TItemShot` \| `TItemDetails`\>\>

###### Returns

`any`

##### onFirstPageFetched()?

> `optional` **onFirstPageFetched**: (`args`) => `any`

###### Parameters

###### args

###### data

[`ApiListResponse`](#apilistresponsetitem)\<`TItemShot`\> \| `null`

###### Returns

`any`

##### onPageFetched()?

> `optional` **onPageFetched**: (`args`) => `Promise`\<\{ `doneAll`: `boolean`; `donePages`: `boolean`; \} \| `void`\> \| \{ `doneAll`: `boolean`; `donePages`: `boolean`; \} \| `void`

###### Parameters

###### args

###### page

`number`

###### data

[`ApiListResponse`](#apilistresponsetitem)\<`TItemShot`\> \| `null`

###### Returns

`Promise`\<\{ `doneAll`: `boolean`; `donePages`: `boolean`; \} \| `void`\> \| \{ `doneAll`: `boolean`; `donePages`: `boolean`; \} \| `void`

##### overrideConcurrency?

> `optional` **overrideConcurrency**: `number`

##### overridePageConcurrency?

> `optional` **overridePageConcurrency**: `number`

##### maxItems?

> `optional` **maxItems**: `number`

##### disableLog?

> `optional` **disableLog**: `boolean`

##### disableErrorLog?

> `optional` **disableErrorLog**: `boolean`

##### optionsOverride?

> `optional` **optionsOverride**: `Partial`\<`ListingScraperOptions`\<`TItemShot`, `TItemDetails`\>\>

##### sessionId?

> `optional` **sessionId**: `string`

##### addListingHeaders?

> `optional` **addListingHeaders**: `Record`\<`string`, `string`\>

##### addItemHeaders?

> `optional` **addItemHeaders**: `Record`\<`string`, `string`\>

##### takePages?

> `optional` **takePages**: `number`

##### startPage?

> `optional` **startPage**: `number`

##### getFetchListParams()?

> `optional` **getFetchListParams**: (`args`) => `Record`\<`string`, `any`\>

###### Parameters

###### args

###### page

`number`

###### pagination

[`ApiPagination`](#apipagination) \| `null`

###### Returns

`Record`\<`string`, `any`\>

***

### ScraperOptions

> **ScraperOptions**: `object`

#### Type declaration

##### apiKey

> **apiKey**: `string`

##### baseUrl?

> `optional` **baseUrl**: `string`

##### addHeaders?

> `optional` **addHeaders**: `Record`\<`string`, `string`\>

##### logger?

> `optional` **logger**: `object`

###### logger.log()

> **log**: (...`args`) => `void`

###### Parameters

###### args

...`any`[]

###### Returns

`void`

###### logger.error()

> **error**: (...`args`) => `void`

###### Parameters

###### args

...`any`[]

###### Returns

`void`

***

### LinkedinCompanySize

> **LinkedinCompanySize**: `"1-10"` \| `"11-50"` \| `"51-200"` \| `"201-500"` \| `"501-1000"` \| `"1001-5000"` \| `"5001-10000"` \| `"10001+"`

***

### LinkedinSalaryRange

> **LinkedinSalaryRange**: `"40k+"` \| `"60k+"` \| `"80k+"` \| `"100k+"` \| `"120k+"` \| `"140k+"` \| `"160k+"` \| `"180k+"` \| `"200k+"`

***

### LinkedinJobType

> **LinkedinJobType**: `"full-time"` \| `"part-time"` \| `"contract"` \| `"internship"`

***

### LinkedinWorkplaceType

> **LinkedinWorkplaceType**: `"office"` \| `"hybrid"` \| `"remote"`

***

### ExperienceLevel

> **ExperienceLevel**: `"internship"` \| `"entry"` \| `"associate"` \| `"mid-senior"` \| `"director"` \| `"executive"`

***

### ScrapePostedLimitOptions

> **ScrapePostedLimitOptions**: `"1h"` \| `"24h"` \| `"week"` \| `"month"` \| `"3months"` \| `"6months"` \| `"year"`

***

### Profile

> **Profile**: `object`

#### Type declaration

##### id

> **id**: `string`

##### publicIdentifier

> **publicIdentifier**: `string`

##### lastName

> **lastName**: `string`

##### firstName

> **firstName**: `string`

##### headline

> **headline**: `string`

##### about

> **about**: `string`

##### linkedinUrl

> **linkedinUrl**: `string`

##### photo

> **photo**: `string`

##### emails

> **emails**: `string`[]

##### websites

> **websites**: `string`[]

##### registeredAt

> **registeredAt**: `string`

##### topSkills

> **topSkills**: `string`

##### connectionsCount

> **connectionsCount**: `number`

##### followerCount

> **followerCount**: `number`

##### openToWork

> **openToWork**: `boolean`

##### hiring

> **hiring**: `boolean`

##### location

> **location**: `object`

###### location.linkedinText

> **linkedinText**: `string`

###### location.countryCode

> **countryCode**: `string`

###### location.parsed

> **parsed**: `object`

###### location.parsed.text

> **text**: `string`

###### location.parsed.countryCode

> **countryCode**: `string`

###### location.parsed.regionCode

> **regionCode**: `string` \| `null`

###### location.parsed.country

> **country**: `string`

###### location.parsed.countryFull

> **countryFull**: `string`

###### location.parsed.state

> **state**: `string`

###### location.parsed.city

> **city**: `string`

##### currentPosition

> **currentPosition**: `object`[]

##### experience

> **experience**: `object`[]

##### education

> **education**: `object`[]

##### certifications

> **certifications**: `object`[]

##### receivedRecommendations

> **receivedRecommendations**: `object`[]

##### skills

> **skills**: `object`[]

##### languages

> **languages**: `object`[]

##### projects

> **projects**: `object`[]

##### publications

> **publications**: `object`[]

##### honorsAndAwards

> **honorsAndAwards**: `object`[]

##### courses

> **courses**: `object`[]

##### featured

> **featured**: `object`

###### featured.images

> **images**: `string`[]

###### featured.link

> **link**: `string`

###### featured.title

> **title**: `string`

###### featured.subtitle

> **subtitle**: `string`

##### verified

> **verified**: `boolean`

##### moreProfiles

> **moreProfiles**: `object`[]

***

### ProfileShort

> **ProfileShort**: `object`

#### Type declaration

##### id

> **id**: `string`

##### publicIdentifier

> **publicIdentifier**: `string`

##### name?

> `optional` **name**: `string`

##### position?

> `optional` **position**: `string`

##### location?

> `optional` **location**: `object`

###### location.linkedinText?

> `optional` **linkedinText**: `string`

##### linkedinUrl?

> `optional` **linkedinUrl**: `string`

##### photo?

> `optional` **photo**: `string`

##### hidden?

> `optional` **hidden**: `boolean`

***

### ProfileServiceShort

> **ProfileServiceShort**: `object`

#### Type declaration

##### id

> **id**: `string`

##### name?

> `optional` **name**: `string`

##### position?

> `optional` **position**: `string`

##### location?

> `optional` **location**: `object`

###### location.linkedinText?

> `optional` **linkedinText**: `string`

##### linkedinProfileUrl?

> `optional` **linkedinProfileUrl**: `string`

##### picture?

> `optional` **picture**: `string`

##### services

> **services**: `string`[]

##### summary?

> `optional` **summary**: `string`

##### objectUrn

> **objectUrn**: `string`

***

### Company

> **Company**: `object`

#### Type declaration

##### id

> **id**: `string`

##### universalName

> **universalName**: `string`

##### name?

> `optional` **name**: `string`

##### tagline?

> `optional` **tagline**: `string`

##### website?

> `optional` **website**: `string`

##### linkedinUrl?

> `optional` **linkedinUrl**: `string`

##### logo?

> `optional` **logo**: `string`

##### foundedOn?

> `optional` **foundedOn**: `object`

###### foundedOn.month?

> `optional` **month**: `string` \| `null`

###### foundedOn.year?

> `optional` **year**: `number`

###### foundedOn.day?

> `optional` **day**: `string` \| `null`

##### employeeCount?

> `optional` **employeeCount**: `number`

##### employeeCountRange?

> `optional` **employeeCountRange**: `object`

###### employeeCountRange.start?

> `optional` **start**: `number`

###### employeeCountRange.end?

> `optional` **end**: `number`

##### followerCount?

> `optional` **followerCount**: `number`

##### description?

> `optional` **description**: `string`

##### locations?

> `optional` **locations**: `object`[]

##### specialities?

> `optional` **specialities**: `string`[]

##### industries?

> `optional` **industries**: `object`[]

##### logos?

> `optional` **logos**: `object`[]

##### backgroundCovers?

> `optional` **backgroundCovers**: `object`[]

##### active?

> `optional` **active**: `boolean`

##### jobSearchUrl?

> `optional` **jobSearchUrl**: `string`

##### phone?

> `optional` **phone**: `object`

###### phone.number

> **number**: `string`

###### phone.extension?

> `optional` **extension**: `string` \| `null`

##### crunchbaseFundingData?

> `optional` **crunchbaseFundingData**: `object`

###### crunchbaseFundingData.numberOfFundingRounds?

> `optional` **numberOfFundingRounds**: `number`

###### crunchbaseFundingData.lastFundingRound?

> `optional` **lastFundingRound**: `object`

###### crunchbaseFundingData.lastFundingRound.localizedFundingType?

> `optional` **localizedFundingType**: `string`

###### crunchbaseFundingData.lastFundingRound.leadInvestors?

> `optional` **leadInvestors**: `Record`\<`string`, `never`\>[]

###### crunchbaseFundingData.lastFundingRound.moneyRaised?

> `optional` **moneyRaised**: `object`

###### crunchbaseFundingData.lastFundingRound.moneyRaised.amount?

> `optional` **amount**: `string`

###### crunchbaseFundingData.lastFundingRound.moneyRaised.currencyCode?

> `optional` **currencyCode**: `string`

###### crunchbaseFundingData.lastFundingRound.fundingRoundUrl?

> `optional` **fundingRoundUrl**: `string`

###### crunchbaseFundingData.lastFundingRound.announcedOn?

> `optional` **announcedOn**: `object`

###### crunchbaseFundingData.lastFundingRound.announcedOn.month?

> `optional` **month**: `number`

###### crunchbaseFundingData.lastFundingRound.announcedOn.year?

> `optional` **year**: `number`

###### crunchbaseFundingData.lastFundingRound.announcedOn.day?

> `optional` **day**: `number`

###### crunchbaseFundingData.lastFundingRound.numberOfOtherInvestors?

> `optional` **numberOfOtherInvestors**: `number`

###### crunchbaseFundingData.lastFundingRound.investorsUrl?

> `optional` **investorsUrl**: `string`

###### crunchbaseFundingData.organizationUrl?

> `optional` **organizationUrl**: `string`

###### crunchbaseFundingData.updatedAt?

> `optional` **updatedAt**: `number`

###### crunchbaseFundingData.fundingRoundsUrl?

> `optional` **fundingRoundsUrl**: `string`

##### pageVerified?

> `optional` **pageVerified**: `boolean`

##### similarOrganizations?

> `optional` **similarOrganizations**: [`CompanyShort`](#companyshort)[]

***

### CompanyShort

> **CompanyShort**: `object`

#### Type declaration

##### id

> **id**: `string`

##### universalName

> **universalName**: `string`

##### linkedinUrl

> **linkedinUrl**: `string`

##### name?

> `optional` **name**: `string`

##### industries?

> `optional` **industries**: `string`

##### location?

> `optional` **location**: `object`

###### location.linkedinText?

> `optional` **linkedinText**: `string`

##### followers?

> `optional` **followers**: `string`

##### summary?

> `optional` **summary**: `string`

##### logo?

> `optional` **logo**: `string`

***

### Job

> **Job**: `object`

#### Type declaration

##### id

> **id**: `string`

##### title?

> `optional` **title**: `string`

##### url?

> `optional` **url**: `string`

##### jobState?

> `optional` **jobState**: `string`

##### postedDate?

> `optional` **postedDate**: `string`

##### descriptionText?

> `optional` **descriptionText**: `string`

##### descriptionHtml?

> `optional` **descriptionHtml**: `string`

##### location?

> `optional` **location**: `object`

###### location.linkedinText?

> `optional` **linkedinText**: `string`

###### location.postalAddress?

> `optional` **postalAddress**: `string` \| `null`

###### location.parsed?

> `optional` **parsed**: `object`

###### location.parsed.text?

> `optional` **text**: `string`

###### location.parsed.countryCode?

> `optional` **countryCode**: `string`

###### location.parsed.regionCode?

> `optional` **regionCode**: `string` \| `null`

###### location.parsed.country?

> `optional` **country**: `string`

###### location.parsed.countryFull?

> `optional` **countryFull**: `string`

###### location.parsed.state?

> `optional` **state**: `string`

###### location.parsed.city?

> `optional` **city**: `string`

##### employmentType?

> `optional` **employmentType**: `"full_time"` \| `"part_time"` \| `"contract"` \| `"internship"`

##### workplaceType?

> `optional` **workplaceType**: `"on_site"` \| `"hybrid"` \| `"remote"`

##### workRemoteAllowed?

> `optional` **workRemoteAllowed**: `boolean`

##### easyApplyUrl?

> `optional` **easyApplyUrl**: `string`

##### applicants?

> `optional` **applicants**: `number`

##### company

> **company**: [`Company`](#company-5)

##### salary

> **salary**: \{ `text`: `string`; `min`: `number`; `max`: `number`; `currency`: `string`; `payPeriod`: `string`; `compensationType`: `string`; `compensationSource`: `string`; `providedByEmployer`: `boolean`; \} \| `null`

##### views?

> `optional` **views**: `number`

##### expireAt?

> `optional` **expireAt**: `string`

##### new?

> `optional` **new**: `boolean`

##### jobApplicationLimitReached?

> `optional` **jobApplicationLimitReached**: `boolean`

##### applicantTrackingSystem?

> `optional` **applicantTrackingSystem**: `string`

##### experienceLevel?

> `optional` **experienceLevel**: `string`

***

### JobShort

> **JobShort**: `object`

#### Type declaration

##### id

> **id**: `string`

##### url?

> `optional` **url**: `string`

##### title?

> `optional` **title**: `string`

##### postedDate?

> `optional` **postedDate**: `string`

##### company?

> `optional` **company**: [`CompanyShort`](#companyshort)

##### location?

> `optional` **location**: `object`

###### location.linkedinText?

> `optional` **linkedinText**: `string`

##### easyApply?

> `optional` **easyApply**: `boolean`

***

### PostShort

> **PostShort**: `object`

#### Type declaration

##### id

> **id**: `string`

##### linkedinUrl

> **linkedinUrl**: `string`

##### content?

> `optional` **content**: `string`

##### contentAttributes

> **contentAttributes**: `object`[]

##### author

> **author**: `object`

###### author.universalName?

> `optional` **universalName**: `string` \| `null`

###### author.publicIdentifier?

> `optional` **publicIdentifier**: `string` \| `null`

###### author.type?

> `optional` **type**: `"company"` \| `"profile"`

###### author.name?

> `optional` **name**: `string`

###### author.linkedinUrl?

> `optional` **linkedinUrl**: `string`

###### author.info?

> `optional` **info**: `string`

###### author.website?

> `optional` **website**: `string` \| `null`

###### author.websiteLabel?

> `optional` **websiteLabel**: `string` \| `null`

###### author.avatar?

> `optional` **avatar**: `object`

###### author.avatar.url

> **url**: `string`

###### author.avatar.width

> **width**: `number`

###### author.avatar.height

> **height**: `number`

###### author.avatar.expiresAt

> **expiresAt**: `number`

##### article

> **article**: \{ `title`: `string` \| `null`; `subtitle`: `string` \| `null`; `link`: `string` \| `null`; `linkLabel`: `string` \| `null`; `description`: `string` \| `null`; `image`: `string` \| `null`; \} \| `null`

##### postedAt

> **postedAt**: `object`

###### postedAt.timestamp

> **timestamp**: `number`

###### postedAt.date

> **date**: `string`

###### postedAt.postedAgoShort

> **postedAgoShort**: `string`

###### postedAt.postedAgoText

> **postedAgoText**: `string`

##### postImages?

> `optional` **postImages**: `object`[]

##### repostId?

> `optional` **repostId**: `string` \| `null`

##### repost?

> `optional` **repost**: [`PostShort`](#postshort)

##### repostedBy?

> `optional` **repostedBy**: `object`

###### repostedBy.name

> **name**: `string`

###### repostedBy.publicIdentifier?

> `optional` **publicIdentifier**: `string`

###### repostedBy.universalName?

> `optional` **universalName**: `string`

###### repostedBy.linkedinUrl

> **linkedinUrl**: `string`

##### newsletterUrl?

> `optional` **newsletterUrl**: `string`

##### newsletterTitle?

> `optional` **newsletterTitle**: `string`

##### socialContent?

> `optional` **socialContent**: `object`

###### socialContent.hideCommentsCount

> **hideCommentsCount**: `boolean`

###### socialContent.hideReactionsCount

> **hideReactionsCount**: `boolean`

###### socialContent.hideSocialActivityCounts

> **hideSocialActivityCounts**: `boolean`

###### socialContent.hideShareAction

> **hideShareAction**: `boolean`

###### socialContent.hideSendAction

> **hideSendAction**: `boolean`

###### socialContent.hideRepostsCount

> **hideRepostsCount**: `boolean`

###### socialContent.hideViewsCount

> **hideViewsCount**: `boolean`

###### socialContent.hideReactAction

> **hideReactAction**: `boolean`

###### socialContent.hideCommentAction

> **hideCommentAction**: `boolean`

###### socialContent.shareUrl

> **shareUrl**: `string`

###### socialContent.showContributionExperience

> **showContributionExperience**: `boolean`

###### socialContent.showSocialDetail

> **showSocialDetail**: `boolean`

##### engagement?

> `optional` **engagement**: `object`

###### engagement.likes

> **likes**: `number`

###### engagement.comments

> **comments**: `number`

###### engagement.shares

> **shares**: `number`

###### engagement.reactions

> **reactions**: `object`[]

##### comments?

> `optional` **comments**: [`PostComment`](#postcomment)[]

##### reactions?

> `optional` **reactions**: [`PostReaction`](#postreaction)[]

***

### PostReaction

> **PostReaction**: `object`

#### Type declaration

##### id

> **id**: `string`

##### reactionType

> **reactionType**: `string`

##### postId

> **postId**: `string`

##### actor

> **actor**: `object`

###### actor.id

> **id**: `string`

###### actor.name

> **name**: `string`

###### actor.linkedinUrl

> **linkedinUrl**: `string`

###### actor.position

> **position**: `string`

###### actor.image

> **image**: `object`

###### actor.image.url

> **url**: `string`

###### actor.image.width

> **width**: `number`

###### actor.image.height

> **height**: `number`

###### actor.image.expiresAt

> **expiresAt**: `number`

***

### ProfileReaction

> **ProfileReaction**: `object`

#### Type declaration

##### id

> **id**: `string`

##### action

> **action**: `string`

##### postId

> **postId**: `string`

##### linkedinUrl

> **linkedinUrl**: `string`

##### createdAt

> **createdAt**: `string`

##### createdAtTimestamp

> **createdAtTimestamp**: `number`

##### actor

> **actor**: `object`

###### actor.id

> **id**: `string`

###### actor.linkedinUrl

> **linkedinUrl**: `string`

###### actor.picture

> **picture**: `string`

##### post

> **post**: [`PostShort`](#postshort)

***

### PostComment

> **PostComment**: `object`

#### Type declaration

##### id

> **id**: `string`

##### linkedinUrl

> **linkedinUrl**: `string`

##### commentary

> **commentary**: `string`

##### createdAt

> **createdAt**: `string`

##### postId

> **postId**: `string`

##### actor

> **actor**: `object`

###### actor.id

> **id**: `string`

###### actor.name

> **name**: `string`

###### actor.linkedinUrl

> **linkedinUrl**: `string`

###### actor.position

> **position**: `string`

###### actor.pictureUrl

> **pictureUrl**: `string`

###### actor.universalName?

> `optional` **universalName**: `string` \| `null`

###### actor.type

> **type**: `"profile"` \| `"company"`

###### actor.picture

> **picture**: `object`

###### actor.picture.url

> **url**: `string`

###### actor.picture.width

> **width**: `number`

###### actor.picture.height

> **height**: `number`

###### actor.picture.expiresAt

> **expiresAt**: `number`

##### replies?

> `optional` **replies**: [`PostComment`](#postcomment)[]

##### createdAtTimestamp

> **createdAtTimestamp**: `number`

##### pinned?

> `optional` **pinned**: `boolean` \| `null`

##### contributed?

> `optional` **contributed**: `boolean` \| `null`

##### edited?

> `optional` **edited**: `boolean` \| `null`

***

### ScrapeLinkedinJobsParams

> **ScrapeLinkedinJobsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`JobShort`](#jobshort), [`Job`](#job)\>

#### Type declaration

##### query

> **query**: [`SearchLinkedinJobsParams`](#searchlinkedinjobsparams)

***

### ScrapeLinkedinCompaniesParams

> **ScrapeLinkedinCompaniesParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`CompanyShort`](#companyshort), [`Company`](#company-5)\>

#### Type declaration

##### query

> **query**: [`SearchLinkedinCompaniesParams`](#searchlinkedincompaniesparams)

***

### ScrapeLinkedinProfilesParams

> **ScrapeLinkedinProfilesParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`ProfileShort`](#profileshort), [`Profile`](#profile-4)\>

#### Type declaration

##### query

> **query**: [`SearchLinkedInProfilesParams`](#searchlinkedinprofilesparams)

##### findEmail?

> `optional` **findEmail**: `boolean`

***

### ScrapeLinkedinSalesNavLeadsParams

> **ScrapeLinkedinSalesNavLeadsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`ProfileShort`](#profileshort), [`Profile`](#profile-4)\>

#### Type declaration

##### query

> **query**: [`BaseFetchParams`](#basefetchparams) & [`SearchLinkedInSalesNavLeadsParams`](#searchlinkedinsalesnavleadsparams)

##### findEmail?

> `optional` **findEmail**: `boolean`

##### warnPageLimit?

> `optional` **warnPageLimit**: `boolean`

***

### ScrapeLinkedinPostsParams

> **ScrapeLinkedinPostsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`PostShort`](#postshort), [`PostShort`](#postshort)\>

#### Type declaration

##### query

> **query**: [`SearchLinkedinPostsParams`](#searchlinkedinpostsparams)

***

### ScrapeLinkedinPostReactionsParams

> **ScrapeLinkedinPostReactionsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`PostReaction`](#postreaction), [`PostReaction`](#postreaction)\>

#### Type declaration

##### query

> **query**: [`GetLinkedinPostReactionsParams`](#getlinkedinpostreactionsparams)

***

### ScrapeLinkedinPostCommentsParams

> **ScrapeLinkedinPostCommentsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`PostComment`](#postcomment), [`PostComment`](#postcomment)\>

#### Type declaration

##### query

> **query**: [`GetLinkedinPostCommentsParams`](#getlinkedinpostcommentsparams)

***

### ScrapeLinkedinProfileCommentsParams

> **ScrapeLinkedinProfileCommentsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`PostComment`](#postcomment), [`PostComment`](#postcomment)\>

#### Type declaration

##### query

> **query**: [`GetLinkedinProfileCommentsParams`](#getlinkedinprofilecommentsparams)

***

### ScrapeLinkedinProfileReactionsParams

> **ScrapeLinkedinProfileReactionsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`ProfileReaction`](#profilereaction), [`ProfileReaction`](#profilereaction)\>

#### Type declaration

##### query

> **query**: [`GetLinkedinProfileReactionsParams`](#getlinkedinprofilereactionsparams)

***

### ScrapeLinkedinServicesParams

> **ScrapeLinkedinServicesParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`ProfileServiceShort`](#profileserviceshort), [`ProfileServiceShort`](#profileserviceshort) & [`Profile`](#profile-4)\>

#### Type declaration

##### query

> **query**: [`SearchLinkedinServicesParams`](#searchlinkedinservicesparams)

##### findEmail?

> `optional` **findEmail**: `boolean`

***

### ErrorResponse

> **ErrorResponse**: `object`

#### Type declaration

##### error

> **error**: `string`

##### message

> **message**: `string`

##### status

> **status**: `number`

***

### LinkedInAd

> **LinkedInAd**: `object`

#### Type declaration

##### id

> **id**: `string`

##### variants

> **variants**: `object`[]

##### about

> **about**: `object`

###### about.format

> **format**: `string` \| `null`

###### about.advertiserName

> **advertiserName**: `string` \| `null`

###### about.advertiserUrl

> **advertiserUrl**: `string` \| `null`

###### about.paidBy

> **paidBy**: `string` \| `null`

###### about.ranFrom?

> `optional` **ranFrom**: `string` \| `null`

###### about.ranTo?

> `optional` **ranTo**: `string` \| `null`

##### impressions

> **impressions**: `object`

###### impressions.total?

> `optional` **total**: `string` \| `null`

###### impressions.byCountry?

> `optional` **byCountry**: `object`[]

##### targeting

> **targeting**: `object`

###### targeting.segments

> **segments**: `object`[]

###### targeting.parameters

> **parameters**: `object`[]

***

### LinkedinAdShort

> **LinkedinAdShort**: `object`

#### Type declaration

##### id

> **id**: `string`

##### advertiser

> **advertiser**: `object`

###### advertiser.name

> **name**: `string`

###### advertiser.imageUrl

> **imageUrl**: `string`

###### advertiser.headline

> **headline**: `string`

##### content

> **content**: `object`

###### content.headline

> **headline**: `string` \| `null`

###### content.commentary

> **commentary**: `string` \| `null`

###### content.pageUrl

> **pageUrl**: `string`

###### content.imageUrl

> **imageUrl**: `string` \| `null`

###### content.message?

> `optional` **message**: `string`

###### content.messageAuthor?

> `optional` **messageAuthor**: `string`

##### creativeType

> **creativeType**: `string`

***

### ApiItemResponse\<TItem\>

> **ApiItemResponse**\<`TItem`\>: [`BaseApiResponse`](#baseapiresponse) & `object`

#### Type declaration

##### element

> **element**: `TItem`

#### Type Parameters

• **TItem**

***

### ApiPagination

> **ApiPagination**: `object`

#### Type declaration

##### totalPages

> **totalPages**: `number`

##### totalElements

> **totalElements**: `number`

##### pageNumber

> **pageNumber**: `number`

##### previousElements

> **previousElements**: `number`

##### pageSize

> **pageSize**: `number`

##### paginationToken?

> `optional` **paginationToken**: `string` \| `null`

##### totalResultCount?

> `optional` **totalResultCount**: `number`

***

### ApiListResponse\<TItem\>

> **ApiListResponse**\<`TItem`\>: [`BaseApiResponse`](#baseapiresponse) & `object`

#### Type declaration

##### pagination

> **pagination**: [`ApiPagination`](#apipagination) \| `null`

##### elements

> **elements**: `TItem`[]

#### Type Parameters

• **TItem**

***

### CreateConcurrentQueuesOptions

> **CreateConcurrentQueuesOptions**: `object`

#### Type declaration

##### id?

> `optional` **id**: `string`
