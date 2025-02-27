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
After fetching a page, the scraper will also make a separate request per each item, to fetch its details (default behavior).

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

After the scraping process is complete, you can view the data using any SQLite database browser. The data will be saved in a file located at `./output/{timestamp}_profiles_{id}.sqlite`.

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

> **getProfile**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Profile`](#profile)\>\>

###### Parameters

###### params

[`GetLinkedInProfileParams`](#getlinkedinprofileparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Profile`](#profile)\>\>

##### searchProfiles()

> **searchProfiles**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileShort`](#profileshort)\>\>

###### Parameters

###### params

[`SearchLinkedInProfilesParams`](#searchlinkedinprofilesparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`ProfileShort`](#profileshort)\>\>

##### getCompany()

> **getCompany**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Company`](#company)\>\>

###### Parameters

###### params

[`GetLinkedinCompanyParams`](#getlinkedincompanyparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Company`](#company)\>\>

##### searchCompanies()

> **searchCompanies**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`CompanyShort`](#companyshort)\>\>

###### Parameters

###### params

[`SearchLinkedinCompaniesParams`](#searchlinkedincompaniesparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`CompanyShort`](#companyshort)\>\>

##### getJob()

> **getJob**(`params`): `Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Job`](#job)\>\>

###### Parameters

###### params

[`GetLinkedinJobParams`](#getlinkedinjobparams)

###### Returns

`Promise`\<[`ApiItemResponse`](#apiitemresponsetitem)\<[`Job`](#job)\>\>

##### searchJobs()

> **searchJobs**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`JobShort`](#jobshort)\>\>

###### Parameters

###### params

[`SearchLinkedinJobsParams`](#searchlinkedinjobsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`JobShort`](#jobshort)\>\>

##### searchPosts()

> **searchPosts**(`params`): `Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostShort`](#postshort)\>\>

###### Parameters

###### params

[`SearchLinkedinPostsParams`](#searchlinkedinpostsparams)

###### Returns

`Promise`\<[`ApiListResponse`](#apilistresponsetitem)\<[`PostShort`](#postshort)\>\>

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

## Interfaces

### GetLinkedInProfileParams

#### Properties

##### url?

> `optional` **url**: `string`

##### publicIdentifier?

> `optional` **publicIdentifier**: `string`

##### profileId?

> `optional` **profileId**: `string`

***

### SearchLinkedInProfilesParams

#### Properties

##### companyId?

> `optional` **companyId**: `string`

##### geoId?

> `optional` **geoId**: `string`

##### location?

> `optional` **location**: `string`

##### search?

> `optional` **search**: `string`

##### page?

> `optional` **page**: `number`

***

### GetLinkedinCompanyParams

#### Properties

##### universalName?

> `optional` **universalName**: `string`

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

> `optional` **companySize**: [`LinkedinCompanySize`](#linkedincompanysize)

***

### GetLinkedinJobParams

#### Properties

##### jobId?

> `optional` **jobId**: `string`

##### url?

> `optional` **url**: `string`

***

### SearchLinkedinJobsParams

#### Properties

##### search?

> `optional` **search**: `string`

##### companyId?

> `optional` **companyId**: `string` \| `string`[]

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

##### companyId?

> `optional` **companyId**: `string`

##### profileId?

> `optional` **profileId**: `string`

***

### BaseApiResponse

#### Properties

##### id

> **id**: `null` \| `string`

##### status

> **status**: `number`

##### error

> **error**: `any`

##### query

> **query**: `Record`\<`string`, `any`\>

##### user?

> `optional` **user**: `object`

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

#### Type declaration

##### outputType?

> `optional` **outputType**: `"json"` \| `"sqlite"`

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

***

### ScraperOptions

> **ScraperOptions**: `object`

#### Type declaration

##### apiKey

> **apiKey**: `string`

##### baseUrl?

> `optional` **baseUrl**: `string`

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

##### url?

> `optional` **url**: `string`

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

#### Type declaration

##### id

> **id**: `string`

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

> `optional` **repost**: [`PostShort`](#postshort)

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

> **ScrapeLinkedinJobsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfig)

#### Type declaration

##### query

> **query**: [`SearchLinkedinJobsParams`](#searchlinkedinjobsparams)

***

### ScrapeLinkedinCompaniesParams

> **ScrapeLinkedinCompaniesParams**: `object` & [`ListingScraperConfig`](#listingscraperconfig)

#### Type declaration

##### query

> **query**: [`SearchLinkedinCompaniesParams`](#searchlinkedincompaniesparams)

***

### ScrapeLinkedinProfilesParams

> **ScrapeLinkedinProfilesParams**: `object` & [`ListingScraperConfig`](#listingscraperconfig)

#### Type declaration

##### query

> **query**: [`SearchLinkedInProfilesParams`](#searchlinkedinprofilesparams)

***

### ScrapeLinkedinPostsParams

> **ScrapeLinkedinPostsParams**: `object` & [`ListingScraperConfig`](#listingscraperconfig)

#### Type declaration

##### query

> **query**: [`SearchLinkedinPostsParams`](#searchlinkedinpostsparams)

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

### ApiListResponse\<TItem\>

> **ApiListResponse**\<`TItem`\>: [`BaseApiResponse`](#baseapiresponse) & `object`

#### Type declaration

##### pagination

> **pagination**: \{ `totalPages`: `number`; `totalElements`: `number`; `pageNumber`: `number`; `previousElements`: `number`; `pageSize`: `number`; \} \| `null`

##### elements

> **elements**: `TItem`[]

#### Type Parameters

• **TItem**
