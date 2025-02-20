import { LinkedinScraper } from '../linkedin/scraper';

const userStats: Record<
  string,
  {
    startTime: number;
    requests: {
      timestamp: number;
    }[];
  }
> = {};

const logRequest = (userKey: string, ...args) => {
  if (!userStats[userKey]) {
    userStats[userKey] = {
      startTime: Date.now(),
      requests: [],
    };
  }
  userStats[userKey].requests.push({
    timestamp: Date.now(),
  });

  const requestsPerSecond =
    userStats[userKey].requests.length / ((Date.now() - userStats[userKey].startTime) / 1000);

  console.info(`${userKey}`, `average r/s: ${requestsPerSecond}`, ...args);
};

export function testConcurrentRequests({
  instances,
  method,
}: {
  method?: 'getCompany' | 'test';
  instances: {
    name?: string;
    method?: 'getCompany' | 'test';
    apiKey: string;
    requests: number;
  }[];
}) {
  instances.forEach((instance, i) => {
    const promises: Promise<any>[] = [];
    const userKey = `instance_${instance.name || i}`;

    const scraper = new LinkedinScraper({
      apiKey: instance.apiKey,
    });

    for (let j = 0; j < instance.requests; j++) {
      if (!userStats[userKey]) {
        userStats[userKey] = {
          startTime: Date.now(),
          requests: [],
        };
      }

      method = method || instance.method || 'getCompany';
      let promise;

      if (method === 'getCompany') {
        promise = scraper.getCompany({ universalName: 'airbnb' });
      }
      if (method === 'test') {
        promise = scraper.test();
      }

      promises.push(promise);

      promise.then((data) => {
        logRequest(userKey, j, data?.id, data?.status, data?.error);
      });
    }

    Promise.all(promises).then(() => {
      const requestsPerSecond =
        userStats[userKey].requests.length / ((Date.now() - userStats[userKey].startTime) / 1000);

      console.info(userKey, 'requests per minute:', requestsPerSecond * 60);
    });
  });
}

if (process.argv.includes('--run')) {
  require('dotenv').config();

  const instances = JSON.parse(process.env.API_TEST_ACCOUNTS || '[]');
  console.info(`instances`, instances);

  testConcurrentRequests({
    method: 'getCompany',
    // method: 'test',
    instances,
  });
}
