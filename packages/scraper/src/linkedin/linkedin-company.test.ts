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
      companySize: '1-10',
    });
    if (!data?.query) console.error('data', data);

    expect(data.elements.length).toBeGreaterThan(0);
    expect(data.elements[0].universalName).not.toBe('google');
  });
});
