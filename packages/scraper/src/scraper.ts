import queryString from 'query-string';

export type ScraperOptions = {
  apiKey: string;
};

export class BaseScraper {
  private apiBasePath = 'https://harvestapi.net/api';

  constructor(private options: ScraperOptions) {}

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

    const apiUrl = `${this.apiBasePath}${path}`;
    let error: any = null;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.options.apiKey,
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
