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

## Classes

### LinkedinScraper

#### Methods

##### getProfile()

> **getProfile**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Profile`](#profile-3)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedInProfileParams`](#getlinkedinprofileparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Profile`](#profile-3)\>\>

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

##### getProfileComments()

> **getProfileComments**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostComment`](#postcomment)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinProfileCommentsParams`](#getlinkedinprofilecommentsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostComment`](#postcomment)\>\>

##### getProfileReactions()

> **getProfileReactions**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostReaction`](#postreaction)\>\>

###### Parameters

###### params

[`BaseFetchParams`](#basefetchparams) & [`GetLinkedinProfileReactionsParams`](#getlinkedinprofilereactionsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostReaction`](#postreaction)\>\>

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

## Interfaces

### BaseFetchParams

#### Properties

##### addHeaders?

> `optional` **addHeaders**: `Record`\<`string`, `string`\>

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

##### short?

> `optional` **short**: `boolean`

***

### SearchLinkedInProfilesParams

#### Properties

##### company?

> `optional` **company**: `string` \| `string`[]

##### companyId?

> `optional` **companyId**: `string` \| `string`[]

##### companyUniversalName?

> `optional` **companyUniversalName**: `string` \| `string`[]

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

##### search?

> `optional` **search**: `string`

##### page?

> `optional` **page**: `number`

***

### SearchLinkedInSalesNavLeadsParams

#### Properties

##### currentCompanies?

> `optional` **currentCompanies**: `string` \| `string`[]

##### pastCompanies?

> `optional` **pastCompanies**: `string` \| `string`[]

##### school?

> `optional` **school**: `string` \| `string`[]

##### location?

> `optional` **location**: `string` \| `string`[]

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

> `optional` **postedLimit**: `"24h"` \| `"week"` \| `"month"`

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

***

### GetLinkedinPostReactionsParams

#### Properties

##### post

> **post**: `string` \| `number`

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

##### postedLimit?

> `optional` **postedLimit**: `"24h"` \| `"week"` \| `"month"`

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

##### const

> **const**: `number`

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

##### headquarter?

> `optional` **headquarter**: `object`

###### headquarter.geographicArea?

> `optional` **geographicArea**: `string`

###### headquarter.city?

> `optional` **city**: `string`

###### headquarter.country?

> `optional` **country**: `string`

###### headquarter.postalCode?

> `optional` **postalCode**: `string`

###### headquarter.line2?

> `optional` **line2**: `string` \| `null`

###### headquarter.line1?

> `optional` **line1**: `string`

###### headquarter.description?

> `optional` **description**: `string`

###### headquarter.parsed?

> `optional` **parsed**: `object`

###### headquarter.parsed.text?

> `optional` **text**: `string`

###### headquarter.parsed.countryCode?

> `optional` **countryCode**: `string`

###### headquarter.parsed.regionCode?

> `optional` **regionCode**: `string` \| `null`

###### headquarter.parsed.country?

> `optional` **country**: `string`

###### headquarter.parsed.countryFull?

> `optional` **countryFull**: `string`

###### headquarter.parsed.state?

> `optional` **state**: `string`

###### headquarter.parsed.city?

> `optional` **city**: `string`

##### locations?

> `optional` **locations**: `object`[]

##### specialities?

> `optional` **specialities**: `string`[]

##### industries?

> `optional` **industries**: `string`[]

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

##### content?

> `optional` **content**: `string`

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

##### postedAgo?

> `optional` **postedAgo**: `string`

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

***

### PostReaction

> **PostReaction**: `object`

#### Type declaration

##### id

> **id**: `string`

##### reactionType

> **reactionType**: `string`

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

> **ScrapeLinkedinProfilesParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`ProfileShort`](#profileshort), [`Profile`](#profile-3)\>

#### Type declaration

##### query

> **query**: [`SearchLinkedInProfilesParams`](#searchlinkedinprofilesparams)

##### findEmail?

> `optional` **findEmail**: `boolean`

***

### ScrapeLinkedinSalesNavLeadsParams

> **ScrapeLinkedinSalesNavLeadsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfigtitemshot-titemdetails)\<[`ProfileShort`](#profileshort), [`Profile`](#profile-3)\>

#### Type declaration

##### query

> **query**: [`SearchLinkedInSalesNavLeadsParams`](#searchlinkedinsalesnavleadsparams)

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
