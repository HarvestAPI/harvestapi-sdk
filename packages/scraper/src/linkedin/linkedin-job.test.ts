require('dotenv').config();

import { LinkedinScraper } from './scraper';

if (!process.env.API_KEY) {
  throw new Error('API_KEY env variable is required');
}

const scraper = new LinkedinScraper({
  apiKey: process.env.API_KEY!,
  basePath: 'http://localhost:3552/api',
});

describe('Linkedin API', () => {
  it('getJob software', async () => {
    const data = await scraper.getJob({
      jobId: '4153069088',
    });

    expect(data.query.jobId).toBe('4153069088');

    expect(data.element.id).toBe('4153069088');
    expect(data.element.title).toBe('Sr. Backend Software Engineer');
    expect(data.element.employmentType).toBe('full_time');
  });

  it('getJob software by url', async () => {
    const data = await scraper.getJob({
      url: 'https://www.linkedin.com/jobs/view/4153069088',
    });

    expect(data.query.jobId).toBe('4153069088');

    expect(data.element.id).toBe('4153069088');
    expect(data.element.title).toBe('Sr. Backend Software Engineer');
    expect(data.element.employmentType).toBe('full_time');
  });

  it('searchJobs Software Engineer in Germany', async () => {
    const data = await scraper.searchJobs({
      search: 'Software Engineer',
      location: 'Germany',
      page: 1,
    });

    expect(data.query.location).toBe('Germany');
    expect(data.query.geoId).toBe('101282230');

    expect(data.elements.length).toBeGreaterThan(0);

    const hasEngineer = !!data.elements.find((el) => el.title!.includes('Engineer'));
    expect(hasEngineer).toBe(true);

    const hasGermany = !!data.elements.find((el) => el.location!.linkedinText!.includes('Germany'));
    expect(hasGermany).toBe(true);
  });

  it('searchJobs Software Engineer in US remote', async () => {
    const data = await scraper.searchJobs({
      search: 'Software Engineer',
      location: 'US',
      workplaceType: ['remote'],
      page: 1,
    });

    expect(data.query.workplaceType).toBe('2');
    expect(data.query.location).toBe('US');
    expect(data.query.geoId).toBe('103644278');
    expect(data.query.search).toBe('Software%20Engineer');

    expect(data.elements.length).toBeGreaterThan(0);
    expect(data.elements[0].id).toBeTruthy();

    const job = await scraper.getJob({
      jobId: data.elements[0].id,
    });

    expect(job.element.workplaceType).toBe('remote');

    try {
      expect(
        job.element.location?.parsed?.countryCode === 'US' ||
          job.element.location?.parsed?.regionCode === 'NAMER' ||
          job.element.location?.parsed?.regionCode === 'GLOBAL',
      ).toBe(true);
    } catch (error) {
      console.warn(job.element.location?.parsed);
      throw error;
    }
  });

  it('searchJobs Software Engineer', async () => {
    const data = await scraper.searchJobs({
      search: 'Software Engineer',
      employmentType: ['contract'],
      sortBy: 'date',
      page: 1,
    });

    expect(data.query.employmentType).toBe('C');
    expect(data.query.search).toBe('Software%20Engineer');
    expect(data.query.sortBy).toBe('DD');

    expect(data.elements.length).toBeGreaterThan(0);
    expect(data.elements[0].id).toBeTruthy();

    const job = await scraper.getJob({
      jobId: data.elements[0].id,
    });

    expect(job.element.employmentType).toBe('contract');
  });

  it('searchJobs Software Engineer at Google', async () => {
    const data = await scraper.searchJobs({
      search: 'Software Engineer',
      sortBy: 'date',
      companyId: '1441',
      page: 1,
    });

    expect(data.query.search).toBe('Software%20Engineer');
    expect(data.query.companyId).toBe('1441');

    expect(data.elements.length).toBeGreaterThan(0);
    expect(data.elements[0].id).toBeTruthy();

    const job = await scraper.getJob({
      jobId: data.elements[0].id,
    });

    expect(job.element.companyUniversalName).toBe('google');
  });

  it('searchJobs Software Engineer 140k+', async () => {
    const data = await scraper.searchJobs({
      search: 'Software Engineer',
      sortBy: 'date',
      salary: ['180k+', '200k+'],
      location: 'US',
      page: 1,
    });

    expect(data.query.search).toBe('Software%20Engineer');
    expect(data.query.salary).toBe('8,9');
    expect(data.query.geoId).toBe('103644278');

    expect(data.elements.length).toBeGreaterThan(0);
    expect(data.elements[0].id).toBeTruthy();

    const job = await scraper.getJob({
      jobId: data.elements[0].id,
    });

    expect(job.element.salaryCurrency).toBe('USD');
    expect(Number(job.element.salaryMax!)).toBeGreaterThan(180000);
  });
});
