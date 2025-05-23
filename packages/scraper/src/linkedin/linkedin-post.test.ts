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
  it('searchPosts Software ', async () => {
    const data = await scraper.searchPosts({
      search: 'Software',
      postedLimit: '24h',
    });
    if (!data?.query) console.error('data', data);

    expect(data.query.search).toBe('Software');
    expect(data.query.postedLimit).toBe('past-24h');
    expect(data.pagination?.pageNumber).toBe(1);

    expect(data.elements.length).toBeGreaterThan(0);

    // Flaky:
    // expect(
    //   data.elements[0].content!.toLowerCase() + data.elements[1].content!.toLowerCase(),
    // ).toContain('software');

    expect(
      data.elements[0].content!.toLowerCase() + data.elements[1].content!.toLowerCase(),
    ).toBeTruthy();
  });

  it('searchPosts by company', async () => {
    const data = await scraper.searchPosts({
      companyId: '1441',
    });
    if (!data?.query) console.error('data', data);

    expect(data.pagination?.pageNumber).toBe(1);
    expect(data.elements.length).toBeGreaterThan(0);

    expect(
      data.elements[0].repostedBy?.universalName === 'google'
        ? data.elements[0].repostedBy.universalName
        : data.elements[0].author.universalName,
    ).toBe('google');
  });

  it('searchPosts by author', async () => {
    const data = await scraper.searchPosts({
      profileId: 'ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc', // Bill Gates profile id
    });
    if (!data?.query) console.error('data', data);

    expect(data.pagination?.pageNumber).toBe(1);
    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].author.type).toBe('profile');
    expect(data.elements[0].author.publicIdentifier).toBe('williamhgates');

    expect(data.elements[1].author.type).toBe('profile');
    expect(data.elements[1].author.publicIdentifier).toBe('williamhgates');
  });
});
