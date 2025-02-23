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
  apiKey: 'your-api-key', // Replace with your HarvestAPI key. Obtain it at https://harvestapi.net/admin/api-keys
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

After the scraping process is complete, you can view the data using any SQLite database browser. The data will be saved in a file located at `./output/{timestamp}_profiles_{id}.sqlite`.

## API Reference

For more detailed information on the available methods and their parameters, check the API reference below


### createLinkedinScraper()

> **createLinkedinScraper**(`options`): [`LinkedinScraper`](README.md#linkedinscraper)

Defined in: linkedin/utils.ts:4

#### Parameters

##### options

[`ScraperOptions`](README.md#scraperoptions)

#### Returns

[`LinkedinScraper`](README.md#linkedinscraper)

## Classes

### LinkedinScraper

Defined in: [linkedin/scraper.ts:25](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L25)

#### Methods

##### getProfile()

> **getProfile**(`params`): `Promise`\<[`ApiItemResponse`](README.md#apiitemresponsetitem)\<[`Profile`](README.md#profile)\>\>

Defined in: [linkedin/scraper.ts:33](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L33)

###### Parameters

###### params

[`GetLinkedInProfileParams`](README.md#getlinkedinprofileparams)

###### Returns

`Promise`\<[`ApiItemResponse`](README.md#apiitemresponsetitem)\<[`Profile`](README.md#profile)\>\>

##### searchProfiles()

> **searchProfiles**(`params`): `Promise`\<[`ApiListResponse`](README.md#apilistresponsetitem)\<[`ProfileShort`](README.md#profileshort)\>\>

Defined in: [linkedin/scraper.ts:37](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L37)

###### Parameters

###### params

[`SearchLinkedInProfilesParams`](README.md#searchlinkedinprofilesparams)

###### Returns

`Promise`\<[`ApiListResponse`](README.md#apilistresponsetitem)\<[`ProfileShort`](README.md#profileshort)\>\>

##### getCompany()

> **getCompany**(`params`): `Promise`\<[`ApiItemResponse`](README.md#apiitemresponsetitem)\<[`Company`](README.md#company)\>\>

Defined in: [linkedin/scraper.ts:43](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L43)

###### Parameters

###### params

[`GetLinkedinCompanyParams`](README.md#getlinkedincompanyparams)

###### Returns

`Promise`\<[`ApiItemResponse`](README.md#apiitemresponsetitem)\<[`Company`](README.md#company)\>\>

##### searchCompanies()

> **searchCompanies**(`params`): `Promise`\<[`ApiListResponse`](README.md#apilistresponsetitem)\<[`CompanyShort`](README.md#companyshort)\>\>

Defined in: [linkedin/scraper.ts:47](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L47)

###### Parameters

###### params

[`SearchLinkedinCompaniesParams`](README.md#searchlinkedincompaniesparams)

###### Returns

`Promise`\<[`ApiListResponse`](README.md#apilistresponsetitem)\<[`CompanyShort`](README.md#companyshort)\>\>

##### getJob()

> **getJob**(`params`): `Promise`\<[`ApiItemResponse`](README.md#apiitemresponsetitem)\<[`Job`](README.md#job)\>\>

Defined in: [linkedin/scraper.ts:53](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L53)

###### Parameters

###### params

[`GetLinkedinJobParams`](README.md#getlinkedinjobparams)

###### Returns

`Promise`\<[`ApiItemResponse`](README.md#apiitemresponsetitem)\<[`Job`](README.md#job)\>\>

##### searchJobs()

> **searchJobs**(`params`): `Promise`\<[`ApiListResponse`](README.md#apilistresponsetitem)\<[`JobShort`](README.md#jobshort)\>\>

Defined in: [linkedin/scraper.ts:57](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L57)

###### Parameters

###### params

[`SearchLinkedinJobsParams`](README.md#searchlinkedinjobsparams)

###### Returns

`Promise`\<[`ApiListResponse`](README.md#apilistresponsetitem)\<[`JobShort`](README.md#jobshort)\>\>

##### searchPosts()

> **searchPosts**(`params`): `Promise`\<[`ApiListResponse`](README.md#apilistresponsetitem)\<[`PostShort`](README.md#postshort)\>\>

Defined in: [linkedin/scraper.ts:61](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L61)

###### Parameters

###### params

[`SearchLinkedinPostsParams`](README.md#searchlinkedinpostsparams)

###### Returns

`Promise`\<[`ApiListResponse`](README.md#apilistresponsetitem)\<[`PostShort`](README.md#postshort)\>\>

##### scrapeJobs()

> **scrapeJobs**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

Defined in: [linkedin/scraper.ts:65](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L65)

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinJobsParams`](README.md#scrapelinkedinjobsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapeCompanies()

> **scrapeCompanies**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

Defined in: [linkedin/scraper.ts:75](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L75)

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinCompaniesParams`](README.md#scrapelinkedincompaniesparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapeProfiles()

> **scrapeProfiles**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

Defined in: [linkedin/scraper.ts:86](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L86)

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinProfilesParams`](README.md#scrapelinkedinprofilesparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

##### scrapePosts()

> **scrapePosts**(`__namedParameters`): `Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

Defined in: [linkedin/scraper.ts:99](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/scraper.ts#L99)

###### Parameters

###### \_\_namedParameters

[`ScrapeLinkedinPostsParams`](README.md#scrapelinkedinpostsparams)

###### Returns

`Promise`\<`undefined` \| \{ `pages`: `number`; `pagesSuccess`: `number`; `items`: `number`; `itemsSuccess`: `number`; `requests`: `number`; `requestsStartTime`: `Date`; \}\>

## Interfaces

### GetLinkedInProfileParams

Defined in: [linkedin/types.ts:3](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L3)

#### Properties

##### url?

> `optional` **url**: `string`

Defined in: [linkedin/types.ts:4](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L4)

##### publicIdentifier?

> `optional` **publicIdentifier**: `string`

Defined in: [linkedin/types.ts:5](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L5)

##### profileId?

> `optional` **profileId**: `string`

Defined in: [linkedin/types.ts:6](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L6)

***

### SearchLinkedInProfilesParams

Defined in: [linkedin/types.ts:9](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L9)

#### Properties

##### companyId?

> `optional` **companyId**: `string`

Defined in: [linkedin/types.ts:10](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L10)

##### geoId?

> `optional` **geoId**: `string`

Defined in: [linkedin/types.ts:11](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L11)

##### location?

> `optional` **location**: `string`

Defined in: [linkedin/types.ts:12](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L12)

##### search?

> `optional` **search**: `string`

Defined in: [linkedin/types.ts:13](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L13)

##### page?

> `optional` **page**: `number`

Defined in: [linkedin/types.ts:14](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L14)

***

### GetLinkedinCompanyParams

Defined in: [linkedin/types.ts:17](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L17)

#### Properties

##### universalName?

> `optional` **universalName**: `string`

Defined in: [linkedin/types.ts:18](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L18)

##### url?

> `optional` **url**: `string`

Defined in: [linkedin/types.ts:19](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L19)

***

### SearchLinkedinCompaniesParams

Defined in: [linkedin/types.ts:32](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L32)

#### Properties

##### geoId?

> `optional` **geoId**: `string`

Defined in: [linkedin/types.ts:33](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L33)

##### location?

> `optional` **location**: `string`

Defined in: [linkedin/types.ts:34](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L34)

##### search?

> `optional` **search**: `string`

Defined in: [linkedin/types.ts:35](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L35)

##### page?

> `optional` **page**: `number`

Defined in: [linkedin/types.ts:36](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L36)

##### companySize?

> `optional` **companySize**: [`LinkedinCompanySize`](README.md#linkedincompanysize)

Defined in: [linkedin/types.ts:37](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L37)

***

### GetLinkedinJobParams

Defined in: [linkedin/types.ts:40](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L40)

#### Properties

##### jobId?

> `optional` **jobId**: `string`

Defined in: [linkedin/types.ts:41](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L41)

##### url?

> `optional` **url**: `string`

Defined in: [linkedin/types.ts:42](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L42)

***

### SearchLinkedinJobsParams

Defined in: [linkedin/types.ts:59](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L59)

#### Properties

##### search?

> `optional` **search**: `string`

Defined in: [linkedin/types.ts:60](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L60)

##### companyId?

> `optional` **companyId**: `string` \| `string`[]

Defined in: [linkedin/types.ts:61](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L61)

##### location?

> `optional` **location**: `string`

Defined in: [linkedin/types.ts:62](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L62)

##### geoId?

> `optional` **geoId**: `string`

Defined in: [linkedin/types.ts:63](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L63)

##### sortBy?

> `optional` **sortBy**: `"date"` \| `"relevance"`

Defined in: [linkedin/types.ts:64](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L64)

##### workplaceType?

> `optional` **workplaceType**: [`LinkedinWorkplaceType`](README.md#linkedinworkplacetype) \| [`LinkedinWorkplaceType`](README.md#linkedinworkplacetype)[]

Defined in: [linkedin/types.ts:65](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L65)

##### employmentType?

> `optional` **employmentType**: [`LinkedinJobType`](README.md#linkedinjobtype) \| [`LinkedinJobType`](README.md#linkedinjobtype)[]

Defined in: [linkedin/types.ts:66](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L66)

##### postedLimit?

> `optional` **postedLimit**: `"24h"` \| `"week"` \| `"month"`

Defined in: [linkedin/types.ts:67](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L67)

##### page?

> `optional` **page**: `number`

Defined in: [linkedin/types.ts:68](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L68)

##### salary?

> `optional` **salary**: [`LinkedinSalaryRange`](README.md#linkedinsalaryrange) \| [`LinkedinSalaryRange`](README.md#linkedinsalaryrange)[]

Defined in: [linkedin/types.ts:69](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L69)

***

### SearchLinkedinPostsParams

Defined in: [linkedin/types.ts:72](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L72)

#### Properties

##### search?

> `optional` **search**: `string`

Defined in: [linkedin/types.ts:73](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L73)

##### page?

> `optional` **page**: `number`

Defined in: [linkedin/types.ts:74](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L74)

##### sortBy?

> `optional` **sortBy**: `"date"` \| `"relevance"`

Defined in: [linkedin/types.ts:75](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L75)

##### postedLimit?

> `optional` **postedLimit**: `"24h"` \| `"week"` \| `"month"`

Defined in: [linkedin/types.ts:76](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L76)

##### companyId?

> `optional` **companyId**: `string`

Defined in: [linkedin/types.ts:77](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L77)

##### profileId?

> `optional` **profileId**: `string`

Defined in: [linkedin/types.ts:78](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L78)

***

### BaseApiResponse

Defined in: [types.ts:1](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/types.ts#L1)

#### Properties

##### id

> **id**: `null` \| `string`

Defined in: [types.ts:2](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/types.ts#L2)

##### status

> **status**: `string`

Defined in: [types.ts:3](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/types.ts#L3)

##### error

> **error**: `any`

Defined in: [types.ts:4](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/types.ts#L4)

##### query

> **query**: `Record`\<`string`, `any`\>

Defined in: [types.ts:5](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/types.ts#L5)

##### user?

> `optional` **user**: `object`

Defined in: [types.ts:8](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/types.ts#L8)

###### subscriptionPlan

> **subscriptionPlan**: `string`

###### requestsThisCycle

> **requestsThisCycle**: `number`

###### requestsLeftThisCycle

> **requestsLeftThisCycle**: `number`

###### requestsUsedThisCycle

> **requestsUsedThisCycle**: `number`

###### requestsConcurrency

> **requestsConcurrency**: `number`

## Type Aliases

### ListingScraperConfig

> **ListingScraperConfig**: `object`

Defined in: [base/types.ts:3](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/base/types.ts#L3)

#### Type declaration

##### outputType?

> `optional` **outputType**: `"json"` \| `"sqlite"`

##### outputDir?

> `optional` **outputDir**: `string`

##### filename?

> `optional` **filename**: `string`

##### tableName?

> `optional` **tableName**: `string`

***

### ScraperOptions

> **ScraperOptions**: `object`

Defined in: [base/types.ts:22](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/base/types.ts#L22)

#### Type declaration

##### apiKey

> **apiKey**: `string`

##### basePath?

> `optional` **basePath**: `string`

***

### LinkedinCompanySize

> **LinkedinCompanySize**: `"1-10"` \| `"11-50"` \| `"51-200"` \| `"201-500"` \| `"501-1000"` \| `"1001-5000"` \| `"5001-10000"` \| `"10001+"`

Defined in: [linkedin/types.ts:22](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L22)

***

### LinkedinSalaryRange

> **LinkedinSalaryRange**: `"40k+"` \| `"60k+"` \| `"80k+"` \| `"100k+"` \| `"120k+"` \| `"140k+"` \| `"160k+"` \| `"180k+"` \| `"200k+"`

Defined in: [linkedin/types.ts:45](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L45)

***

### LinkedinJobType

> **LinkedinJobType**: `"full-time"` \| `"part-time"` \| `"contract"` \| `"internship"`

Defined in: [linkedin/types.ts:56](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L56)

***

### LinkedinWorkplaceType

> **LinkedinWorkplaceType**: `"office"` \| `"hybrid"` \| `"remote"`

Defined in: [linkedin/types.ts:57](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L57)

***

### Profile

> **Profile**: `object`

Defined in: [linkedin/types.ts:81](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L81)

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

###### location.preferredGeoPlace

> **preferredGeoPlace**: `string` \| `null`

###### location.countryCode

> **countryCode**: `string`

###### location.postalCode

> **postalCode**: `string` \| `null`

###### location.country

> **country**: `string`

###### location.countryFull

> **countryFull**: `string`

##### currentPosition

> **currentPosition**: `object`[]

##### experience

> **experience**: `object`[]

##### education

> **education**: `object`[]

##### certificates

> **certificates**: `object`[]

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

Defined in: [linkedin/types.ts:162](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L162)

#### Type declaration

##### id?

> `optional` **id**: `string`

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

##### url?

> `optional` **url**: `string`

##### photo?

> `optional` **photo**: `string`

##### hidden?

> `optional` **hidden**: `boolean`

***

### Company

> **Company**: `object`

Defined in: [linkedin/types.ts:175](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L175)

#### Type declaration

##### id?

> `optional` **id**: `string`

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

##### logoUrl?

> `optional` **logoUrl**: `string`

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

##### industry?

> `optional` **industry**: `string`[]

##### logos?

> `optional` **logos**: `object`[]

##### backgroundCovers?

> `optional` **backgroundCovers**: `object`[]

##### active?

> `optional` **active**: `boolean`

##### jobSearchUrl?

> `optional` **jobSearchUrl**: `string`

##### phone?

> `optional` **phone**: `string` \| `null`

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

Defined in: [linkedin/types.ts:266](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L266)

#### Type declaration

##### id?

> `optional` **id**: `string`

##### name?

> `optional` **name**: `string`

##### industry?

> `optional` **industry**: `string`

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

##### url?

> `optional` **url**: `string`

##### universalName

> **universalName**: `string`

***

### Job

> **Job**: `object`

Defined in: [linkedin/types.ts:280](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L280)

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

##### companyName?

> `optional` **companyName**: `string`

##### companyLogo?

> `optional` **companyLogo**: `string`

##### companyLink?

> `optional` **companyLink**: `string`

##### companyUniversalName?

> `optional` **companyUniversalName**: `string`

##### salaryText?

> `optional` **salaryText**: `string`

##### salaryMin?

> `optional` **salaryMin**: `string`

##### salaryMax?

> `optional` **salaryMax**: `string`

##### salaryCurrency?

> `optional` **salaryCurrency**: `string`

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

Defined in: [linkedin/types.ts:321](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L321)

#### Type declaration

##### id

> **id**: `string`

##### url?

> `optional` **url**: `string`

##### title?

> `optional` **title**: `string`

##### postedDate?

> `optional` **postedDate**: `string`

##### companyName?

> `optional` **companyName**: `string`

##### companyLink?

> `optional` **companyLink**: `string`

##### companyUniversalName?

> `optional` **companyUniversalName**: `string`

##### location?

> `optional` **location**: `object`

###### location.linkedinText?

> `optional` **linkedinText**: `string`

##### easyApply?

> `optional` **easyApply**: `boolean`

***

### PostShort

> **PostShort**: `object`

Defined in: [linkedin/types.ts:335](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L335)

#### Type declaration

##### id

> **id**: `string`

##### content?

> `optional` **content**: `string`

##### title?

> `optional` **title**: `string`

##### subtitle?

> `optional` **subtitle**: `string`

##### link?

> `optional` **link**: `string`

##### linkLabel?

> `optional` **linkLabel**: `string`

##### description?

> `optional` **description**: `string`

##### authorUniversalName?

> `optional` **authorUniversalName**: `string` \| `null`

##### authorPublicIdentifier?

> `optional` **authorPublicIdentifier**: `string` \| `null`

##### authorType?

> `optional` **authorType**: `"company"` \| `"profile"`

##### authorName?

> `optional` **authorName**: `string`

##### authorLinkedinUrl?

> `optional` **authorLinkedinUrl**: `string`

##### authorPosition?

> `optional` **authorPosition**: `string`

##### authorWebsite?

> `optional` **authorWebsite**: `string` \| `null`

##### authorWebsiteLabel?

> `optional` **authorWebsiteLabel**: `string` \| `null`

##### authorAvatar?

> `optional` **authorAvatar**: `object`

###### authorAvatar.url

> **url**: `string`

###### authorAvatar.width

> **width**: `number`

###### authorAvatar.height

> **height**: `number`

###### authorAvatar.expiresAt

> **expiresAt**: `number`

##### postedAgo?

> `optional` **postedAgo**: `string`

##### postImage?

> `optional` **postImage**: `object`

###### postImage.url

> **url**: `string`

###### postImage.width

> **width**: `number`

###### postImage.height

> **height**: `number`

###### postImage.expiresAt

> **expiresAt**: `number`

##### repostId?

> `optional` **repostId**: `string` \| `null`

##### repost?

> `optional` **repost**: [`PostShort`](README.md#postshort)

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

### ScrapeLinkedinJobsParams

> **ScrapeLinkedinJobsParams**: `object` & [`ListingScraperConfig`](README.md#listingscraperconfig)

Defined in: [linkedin/types.ts:393](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L393)

#### Type declaration

##### query

> **query**: [`SearchLinkedinJobsParams`](README.md#searchlinkedinjobsparams)

***

### ScrapeLinkedinCompaniesParams

> **ScrapeLinkedinCompaniesParams**: `object` & [`ListingScraperConfig`](README.md#listingscraperconfig)

Defined in: [linkedin/types.ts:397](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L397)

#### Type declaration

##### query

> **query**: [`SearchLinkedinCompaniesParams`](README.md#searchlinkedincompaniesparams)

***

### ScrapeLinkedinProfilesParams

> **ScrapeLinkedinProfilesParams**: `object` & [`ListingScraperConfig`](README.md#listingscraperconfig)

Defined in: [linkedin/types.ts:401](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L401)

#### Type declaration

##### query

> **query**: [`SearchLinkedInProfilesParams`](README.md#searchlinkedinprofilesparams)

***

### ScrapeLinkedinPostsParams

> **ScrapeLinkedinPostsParams**: `object` & [`ListingScraperConfig`](README.md#listingscraperconfig)

Defined in: [linkedin/types.ts:405](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L405)

#### Type declaration

##### query

> **query**: [`SearchLinkedinPostsParams`](README.md#searchlinkedinpostsparams)

***

### ErrorResponse

> **ErrorResponse**: `object`

Defined in: [linkedin/types.ts:409](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/linkedin/types.ts#L409)

#### Type declaration

##### error

> **error**: `string`

##### message

> **message**: `string`

##### status

> **status**: `number`

***

### ApiItemResponse\<TItem\>

> **ApiItemResponse**\<`TItem`\>: [`BaseApiResponse`](README.md#baseapiresponse) & `object`

Defined in: [types.ts:17](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/types.ts#L17)

#### Type declaration

##### element

> **element**: `TItem`

#### Type Parameters

• **TItem**

***

### ApiListResponse\<TItem\>

> **ApiListResponse**\<`TItem`\>: [`BaseApiResponse`](README.md#baseapiresponse) & `object`

Defined in: [types.ts:21](https://github.com/xorcuit/harvestapi-sdk/blob/ad6dc30d7c7bd32c4f6be7c4f76ca9f7ad68935a/packages/scraper/src/types.ts#L21)

#### Type declaration

##### pagination

> **pagination**: \{ `totalPages`: `number`; `totalElements`: `number`; `pageNumber`: `number`; `previousElements`: `number`; `pageSize`: `number`; \} \| `null`

##### elements

> **elements**: `TItem`[]

#### Type Parameters

• **TItem**
