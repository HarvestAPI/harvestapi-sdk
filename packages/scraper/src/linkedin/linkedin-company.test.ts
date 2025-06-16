require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-require-imports

import { LinkedinScraper } from './scraper';

if (!process.env.API_KEY) {
  throw new Error('API_KEY env variable is required');
}

const scraper = new LinkedinScraper({
  apiKey: process.env.API_KEY!,
  baseUrl: process.env.TEST_API_BASE_URL!,
});

describe('Linkedin API', () => {
  it('getCompany google', async () => {
    const data = await scraper.getCompany({
      universalName: 'google',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element.id).toBe('1441');
    expect(data.element.name).toBe('Google');
  });

  it('getCompany by URL google', async () => {
    const data = await scraper.getCompany({
      url: 'https://www.linkedin.com/company/google',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element.id).toBe('1441');
    expect(data.element.name).toBe('Google');
  });

  it('getCompany by ID google', async () => {
    const data = await scraper.getCompany({
      companyId: '1441',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element.id).toBe('1441');
    expect(data.element.name).toBe('Google');
  });

  it('searchCompanies google', async () => {
    const data = await scraper.searchCompanies({
      search: 'Google',
      location: 'Germany',
      page: 1,
    });
    if (!data?.query) console.error('data', data);

    expect(data.elements.length).toBeGreaterThan(0);
    expect(data.elements[0].name).toBe('Google');
    expect(data.elements[0].universalName).toBe('google');
  });

  it('searchCompanies google small size', async () => {
    const data = await scraper.searchCompanies({
      search: 'Google',
      location: 'Germany',
      companySize: ['1-10', '11-50'],
    });
    if (!data?.query || !data.elements?.length) console.error('data', data);

    expect(data.elements.length).toBeGreaterThan(0);
    expect(data.elements[0].universalName).not.toBe('google');
  });

  it('searchCompanies school Stanford University', async () => {
    const data = await scraper.searchCompanies({
      search: 'Stanford University',
    });
    if (!data?.query) console.error('data', data);

    expect(data.elements.length).toBeGreaterThan(0);
    expect(data.elements[0].universalName).toBe('stanford-university');
  });

  it('getCompany by name 1', async () => {
    const data = await scraper.getCompany({
      search: 'Stanford University',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element?.universalName).toBe('stanford-university');
  });

  it('getCompany by name 2', async () => {
    const data = await scraper.getCompany({
      search: 'Oracle Corp',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element?.universalName).toBe('oracle');
  });

  it('getCompany search by id', async () => {
    const data = await scraper.getCompany({
      search: '82827208',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element?.universalName).toBe('cartconnect1');
  });

  it('getCompany search by old URL', async () => {
    const data = await scraper.getCompany({
      search: 'https://www.linkedin.com/edu/mount-holyoke-college',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element?.universalName).toBe('mount-holyoke-college');
  });

  it('getCompany get by redirect URL', async () => {
    const data = await scraper.getCompany({
      url: 'https://www.linkedin.com/company/abdullah-al-othaim-investment',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element?.universalName).toBe('othaiminv');
  });
});
