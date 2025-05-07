import queryString from 'query-string';
import { ScraperOptions } from './types';

export class BaseScraper {
  private apiBaseUrl = 'https://api.harvest-api.com';

  constructor(private options: ScraperOptions) {
    if (options.baseUrl) {
      this.apiBaseUrl = options.baseUrl;
    }
    if (this.apiBaseUrl.endsWith('/')) {
      this.apiBaseUrl = this.apiBaseUrl.slice(0, -1);
    }
  }

  async fetchApi({ path, params }: { path: string; params?: any }) {
    if (!this.options.apiKey) {
      console.error('API Key is required');
      return {
        error: 'API Key is required to fetch API',
      };
    }
    if (!path) {
      console.error('Path is required');
      return {
        error: 'Path is required to fetch API',
      };
    }
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }

    if (params && Object.values(params).filter(Boolean).length > 0) {
      path += `?${queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
      })}`;
    }

    const apiUrl = `${this.apiBaseUrl}${path}`;
    let error: any = null;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.options.apiKey,
        ...this.options.addHeaders,
      },
    }).catch((e) => {
      console.error('Error fetching API:', e);
      error = e;
      return null;
    });

    const data = await response?.json()?.catch((e) => {
      console.error('Error parsing response:', e);
      error = e;
      return null;
    });

    if (!response?.ok) {
      return {
        error: data?.error?.error || data?.error || error,
        status: response?.status,
      };
    }

    return data;
  }
}
