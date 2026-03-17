import queryString from 'query-string';
import { ScraperOptions } from './types';
import { sleep } from '../utils';

type FetchApiArgs = {
  path: string;
  params?: any;
  addHeaders?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  maxRetries?: number;
};

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

  /** @internal */
  private async __fetchApi(args: FetchApiArgs) {
    if (!this.options.apiKey) {
      this.logger.error('API Key is required');
      return { error: 'API Key is required to fetch API' };
    }

    // 1. Clone params so we don't mutate the original args across retries!
    const params = args.params ? { ...args.params } : {};
    let path = args.path;

    if (params.overridePath) {
      path = params.overridePath;
      delete params.overridePath; // Safe because we cloned `params`
    }

    if (!path) {
      this.logger.error('Path is required');
      return { error: 'Path is required to fetch API' };
    }

    if (!path.startsWith('/')) {
      path = `/${path}`;
    }

    let addHeaders = { ...args.addHeaders };
    if (params.addHeaders) {
      addHeaders = {
        ...addHeaders,
        ...params.addHeaders,
      };
      delete params.addHeaders;
    }

    if (Object.values(params).filter(Boolean).length > 0) {
      path += `?${queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
      })}`;
    }

    const apiUrl = `${this.apiBaseUrl}${path}`;

    try {
      const response = await fetch(apiUrl, {
        method: args.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.options.apiKey,
          ...this.options.addHeaders,
          ...addHeaders,
        },
        body: args.body ? JSON.stringify(args.body) : undefined,
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        this.logger.error('Error parsing response:', jsonError);
        return {
          error: 'Failed to parse JSON response',
          status: response.status,
        };
      }

      if (!response.ok || !data) {
        return {
          error: data?.error?.error || data?.error || 'Unknown API Error',
          status: response.status,
        };
      }

      return data;
    } catch (error: any) {
      this.logger.error('Error fetching API:', error.message || error, path);

      return { error };
    }
  }

  async fetchApi(args: FetchApiArgs) {
    const maxRetries = args.maxRetries ?? 2;
    const retryErrorCodes = ['ECONNRESET'];
    let res: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      res = await this.__fetchApi(args);

      const errorCode = res?.error?.cause?.code || res?.error?.code;
      const isLastAttempt = attempt === maxRetries;

      if (errorCode && retryErrorCodes.includes(errorCode) && !isLastAttempt) {
        this.logger.error(`${errorCode} error, retrying... (${attempt + 1}/${maxRetries})`);
        await sleep(1000);
        continue;
      }

      return res;
    }

    return res;
  }
}
