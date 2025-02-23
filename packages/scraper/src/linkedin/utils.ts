import { ScraperOptions } from '../base';
import { LinkedinScraper } from './scraper';

export function createLinkedinScraper(options: ScraperOptions) {
  return new LinkedinScraper(options);
}
