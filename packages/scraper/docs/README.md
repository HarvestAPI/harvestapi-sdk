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
