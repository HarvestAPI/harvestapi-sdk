import queryString from 'query-string';
import { ScraperOptions } from './types';

export class BaseScraper {
  private apiBaseUrl = 'https://api.harvest-api.com';

  logger: Required<ScraperOptions>['logger'] = console;

  constructor(private options: ScraperOptions) {
    if (options.baseUrl) {
      this.apiBaseUrl = options.baseUrl;
    }
    if (this.apiBaseUrl.endsWith('/')) {
      this.apiBaseUrl = this.apiBaseUrl.slice(0, -1);
    }
    this.logger = options.logger || console;
  }

  async fetchApi({
    path,
    params,
    addHeaders,
    method = 'GET',
    body,
  }: {
    path: string;
    params?: any;
    addHeaders?: Record<string, string>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
  }) {
    if (!this.options.apiKey) {
      this.logger.error('API Key is required');
      return {
        error: 'API Key is required to fetch API',
      };
    }
    if (!path) {
      this.logger.error('Path is required');
      return {
        error: 'Path is required to fetch API',
      };
    }
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }

    if (params.addHeaders) {
      addHeaders = {
        ...addHeaders,
        ...params.addHeaders,
      };
      delete params.addHeaders;
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
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.options.apiKey,
        ...this.options.addHeaders,
        ...addHeaders,
      },
      body: body ? JSON.stringify(body) : undefined,
    }).catch((e) => {
      this.logger.error('Error fetching API:', e, apiUrl);
      error = e;
      return null;
    });

    const data = await response?.json()?.catch((e) => {
      this.logger.error('Error parsing response:', e);
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
