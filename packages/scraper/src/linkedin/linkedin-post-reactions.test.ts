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
    const data = await scraper.getPostReactions({
      post: 'https://www.linkedin.com/posts/satyanadella_microsofts-aurora-ai-foundation-model-goes-activity-7330987211561058307-01m1/?utm_source=share&utm_medium=member_desktop&rcm=ACoAACzazy4B3ajZsA0WxWr6m4S77iItYbYCLZM',
    });
    if (!data?.query) console.error('data', data);

    expect(data.query.postId).toBe('7330987211561058307');
    expect(data.pagination?.pageNumber).toBe(1);
    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].actor!.linkedinUrl).toBeTruthy();
  });

  it('get by post id', async () => {
    const data = await scraper.getPostReactions({
      post: '7330987211561058307',
    });
    if (!data?.query) console.error('data', data);

    expect(data.query.postId).toBe('7330987211561058307');
    expect(data.pagination?.pageNumber).toBe(1);
    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].actor!.linkedinUrl).toBeTruthy();
  });
});
