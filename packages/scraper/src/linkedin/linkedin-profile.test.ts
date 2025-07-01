require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-require-imports

import { LinkedinScraper } from './scraper';

if (!process.env.API_KEY) {
  throw new Error('API_KEY env variable is required');
}

const scraper = new LinkedinScraper({
  apiKey: process.env.API_KEY!,
  baseUrl: process.env.TEST_API_BASE_URL!,
});

describe('Linkedin Profile API', () => {
  it('getProfile by url', async () => {
    const data = await scraper.getProfile({
      url: 'https://www.linkedin.com/in/williamhgates',
    });
    if (!data?.query) console.error('data', data);

    expect(data.query.publicIdentifier).toBe('williamhgates');

    expect(data.element.publicIdentifier).toBe('williamhgates');
    expect(data.element.id).toBe('ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc');
    expect(data.element.firstName).toBe('Bill');
  });

  it('getProfile by profileId', async () => {
    const data = await scraper.getProfile({
      profileId: 'ACoAAA7IcPoBXbqAyFuCjYLHAhmm13BgChs-P5g',
    });
    if (!data?.query) console.error('data', data);

    expect(data.query.publicIdentifier).toBe('lewisowain');

    expect(data.element.publicIdentifier).toBe('lewisowain');
    expect(data.element.firstName).toBe('Owain');
  });

  it('getProfile by LSN profileId', async () => {
    const data = await scraper.getProfile({
      profileId: 'ACwAACH6bPIB0ezh5N9RULGK9F2kzeF2OOUx9zY',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element.publicIdentifier).toBe('amandasantospask');
    expect(data.element.firstName).toBe('Amanda');
  });

  it('getProfile by profileId in URL', async () => {
    const data = await scraper.getProfile({
      query: 'https://www.linkedin.com/in/ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc',
    });
    if (!data?.query) console.error('data', data);

    expect(data.element.publicIdentifier).toBe('williamhgates');
    expect(data.element.firstName).toBe('Bill');
  });

  it('searchProfiles Mark in Australia', async () => {
    const data = await scraper.searchProfiles({
      search: 'Mark',
      location: 'Australia',
    });
    if (!data?.query) console.error('data', data);

    expect(data.query.geoId).toBe('101452733');
    expect(data.query.geoTitle).toBe('Australia');

    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].name).toMatch(/Mark|LinkedIn Member/i);
    expect(data.elements[1].name).toMatch(/Mark|LinkedIn Member/i);

    const hasAustralia = !!data.elements.find((el) =>
      el.location!.linkedinText!.includes('Australia'),
    );
    expect(hasAustralia).toBe(true);
  });

  it('searchProfiles Michael at Google US', async () => {
    const data = await scraper.searchProfiles({
      search: 'Michael',
      // location: 'US',
      companyId: '1441',
    });
    if (!data?.query) console.error('data', data);
    // expect(data.query.location).toBe('US');
    // expect(data.query.geoId).toBe('103644278');

    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].name).toContain('Michael');
    expect(data.elements[1].name).toContain('Michael');

    const hasGoogle = !!data.elements.find((el) => el.position!.includes('Google'));
    expect(hasGoogle).toBe(true);
  });
});
