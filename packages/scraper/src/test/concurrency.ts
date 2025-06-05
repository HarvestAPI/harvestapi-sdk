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

const logRequest = ({
  userKey,
  status,
  index,
  id,
  error,
  used,
  left,
}: {
  userKey: string;
  index: number;
  status: number;
  id?: string;
  error?: any;
  used?: number;
  left?: number;
}) => {
  if (!userStats[userKey]) {
    userStats[userKey] = {
      startTime: Date.now(),
      requests: [],
    };
  }
  if (status < 400) {
    userStats[userKey].requests.push({
      timestamp: Date.now(),
    });
  }

  const requestsPerSecond =
    userStats[userKey].requests.length / ((Date.now() - userStats[userKey].startTime) / 1000);

  console.info(
    `${userKey}`,
    `average r/s: ${requestsPerSecond.toFixed(2)}`,
    index,
    id,
    status,
    error,
    'used:',
    used,
    'left:',
    left,
  );
};

export function testConcurrentRequests({
  instances,
  method,
  localhost,
  baseUrl,
}: {
  method?: 'getCompany' | 'test';
  localhost?: boolean;
  baseUrl?: string;
  instances: {
    name?: string;
    method?: 'getCompany' | 'test';
    apiKey: string;
    requests: number;
    loops?: number;
    baseUrl?: string;
  }[];
}) {
  instances.forEach(async (instance, i) => {
    for (let loop = 0; loop < (instance.loops || 1); loop++) {
      const promises: Promise<any>[] = [];
      const userKey = `instance_${instance.name || i}`;
      delete userStats[userKey];

      const scraper = new LinkedinScraper({
        apiKey: instance.apiKey,
        baseUrl:
          baseUrl || instance.baseUrl || (localhost ? 'http://localhost:3552/api' : undefined),
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
          logRequest({
            userKey,
            index: j,
            id: data?.element?.id,
            status: data?.status,
            error: data?.error,
            used: data?.user?.requestsUsedThisCycle,
            left: data?.user?.requestsLeftThisCycle,
          });
        });
      }

      await Promise.all(promises);
      const requestsPerSecond =
        userStats[userKey].requests.length / ((Date.now() - userStats[userKey].startTime) / 1000);

      console.info(userKey, 'loop', loop, 'requests per minute:', requestsPerSecond * 60);
    }
  });
}

if (process.argv.includes('--run')) {
  require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-require-imports

  const instances = JSON.parse(process.env.API_TEST_ACCOUNTS || '[]');
  console.info(`instances`, instances);

  testConcurrentRequests({
    method: 'getCompany',
    // method: 'test',
    instances,
  });
}
