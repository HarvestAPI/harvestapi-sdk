require('dotenv').config();

import { LinkedinScraper } from './scraper';

if (!process.env.API_KEY) {
  throw new Error('API_KEY env variable is required');
}

const scraper = new LinkedinScraper({
  apiKey: process.env.API_KEY!,
  basePath: 'http://localhost:3552/api',
});

describe('Linkedin Profile API', () => {
  it('getProfile by url', async () => {
    const data = await scraper.getProfile({
      url: 'https://www.linkedin.com/in/williamhgates',
    });

    expect(data.query.publicIdentifier).toBe('williamhgates');

    expect(data.element.publicIdentifier).toBe('williamhgates');
    expect(data.element.id).toBe('ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc');
    expect(data.element.firstName).toBe('Bill');
  });

  it('getJob software by profileId', async () => {
    const data = await scraper.getProfile({
      profileId: 'ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc',
    });

    expect(data.query.publicIdentifier).toBe('williamhgates');

    expect(data.element.publicIdentifier).toBe('williamhgates');
    expect(data.element.firstName).toBe('Bill');
  });

  it('searchProfiles Mark in Australia', async () => {
    const data = await scraper.searchProfiles({
      search: 'Mark',
      location: 'Australia',
    });

    expect(data.query.geoId).toBe('101452733');
    expect(data.query.geoTitle).toBe('Australia');

    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].name).toContain('Mark');
    expect(data.elements[1].name).toContain('Mark');

    const hasAustralia = !!data.elements.find((el) =>
      el.location!.linkedinText!.includes('Australia'),
    );
    expect(hasAustralia).toBe(true);
  });

  it('searchProfiles Mark at Google US', async () => {
    const data = await scraper.searchProfiles({
      search: 'Mark',
      location: 'US',
      companyId: '1441',
    });

    expect(data.query.location).toBe('US');
    expect(data.query.geoId).toBe('103644278');

    expect(data.elements.length).toBeGreaterThan(0);

    expect(data.elements[0].name).toContain('Mark');
    expect(data.elements[1].name).toContain('Mark');

    const hasGoogle = !!data.elements.find((el) => el.position!.includes('Google'));
    expect(hasGoogle).toBe(true);
  });
});
