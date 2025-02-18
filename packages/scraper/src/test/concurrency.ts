import { LinkedinScraper } from 'src/linkedin/scraper';

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

  console.log(`data ${userKey}`, `average r/s: ${requestsPerSecond}`, ...args);
};

export function testConcurrentRequests({
  instances,
  method,
}: {
  method?: 'getCompany' | 'test';
  instances: {
    method?: 'getCompany' | 'test';
    apiKey: string;
    requests: number;
  }[];
}) {
  instances.forEach((instance, i) => {
    const scraper = new LinkedinScraper({
      apiKey: instance.apiKey,
    });

    for (let j = 0; j < instance.requests; j++) {
      const userKey = `instance_${i}`;

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

      promise.then((data) => {
        logRequest(userKey, j, data?.id, data?.status, data?.error);
      });
    }
  });
}
