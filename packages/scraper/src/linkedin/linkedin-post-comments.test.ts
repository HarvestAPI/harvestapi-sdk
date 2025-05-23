require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-require-imports

import { LinkedinScraper } from './scraper';

if (!process.env.API_KEY) {
  throw new Error('API_KEY env variable is required');
}

const scraper = new LinkedinScraper({
  apiKey: process.env.API_KEY!,
  baseUrl: process.env.TEST_API_BASE_URL!,
});

describe('linkedin-post-reactions.test', () => {
  it('get by full post url', async () => {
    const data = await scraper.getPostComments({
      post: 'https://www.linkedin.com/posts/microsoft-events_microsoft-build-has-arrived-in-seattle-and-ugcPost-7329991434395160578-GnK7?utm_source=share&utm_medium=member_desktop&rcm=ACoAACzazy4B3ajZsA0WxWr6m4S77iItYbYCLZM',
    });
    if (!data?.query?.liId) console.error('data', data);

    expect(data.query.liId).toBe('urn:li:ugcPost:7329991434395160578');
    expect(data.pagination?.pageNumber).toBe(1);
    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].actor!.linkedinUrl).toBeTruthy();
  });

  it('get by post id', async () => {
    const data = await scraper.getPostComments({
      post: '7320867199693246465',
    });
    if (!data?.query?.liId) console.error('data', data);

    expect(data.query.liId).toBe('urn:li:ugcPost:7320867198548279298');
    expect(data.pagination?.pageNumber).toBe(1);
    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].actor!.linkedinUrl).toBeTruthy();
  });
});
