export type AsyncFunction<TArgs extends any[] = any[], TRes = any> = (
  ...args: TArgs
) => Promise<TRes>;

export type CreateConcurrentQueuesOptions = {
  id?: string;
};

export function createConcurrentQueues<TArgs extends any[] = any[], TRes = any>(
  concurrency: number,
  fn: AsyncFunction<TArgs, TRes>,
  opts?: CreateConcurrentQueuesOptions, // eslint-disable-line @typescript-eslint/no-unused-vars
): AsyncFunction<TArgs, TRes> {
  if (!concurrency || isNaN(concurrency)) {
    throw new Error(
      `createConcurrentQueues: Concurrency must be a number > 0, provided: ${concurrency}`,
    );
  }
  let activePromises = 0;
  const pendingTasks: (() => void)[] = [];

  return async (...args: TArgs) => {
    return new Promise<any>((resolve, reject) => {
      const execute = async () => {
        activePromises++;
        // if (opts?.id === 'debug') console.log('execute activePromises++', activePromises);

        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          activePromises--;
          // if (opts?.id === 'debug')
          //   console.log(
          //     'finally activePromises--',
          //     activePromises,
          //     'pendingTasks',
          //     pendingTasks.length,
          //   );

          if (pendingTasks.length > 0) {
            const nextTask = pendingTasks.shift();
            if (nextTask) setTimeout(nextTask, 1);
          }
        }
      };
      // if (opts?.id === 'debug')
      //   console.log('invoke Queue. activePromises:', activePromises, 'concurrency', concurrency);

      if (activePromises < concurrency) {
        execute();
      } else {
        pendingTasks.push(execute);
      }
    });
  };
}

// Test

// const myAsyncFunction = async (input: number) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return `Result ${input}`;
// };

// const queuedMyAsyncFunction = createConcurrentQueues(2, myAsyncFunction);

// for (let i = 0; i < 20; i++) {
//   (async () => {
//     const result = await queuedMyAsyncFunction(i);
//     console.log(result); // Logs `Result 0`, `Result 1`, `Result 2`, ... per i. Make 2 logs per second.
//   })();
// }

export const concurrentQueues = async <T, R>(
  concurrency: number,
  items: T[],
  worker: (item: T, itemIndex: number, queueIndex: number) => Promise<R>,
): Promise<(R | null)[]> => {
  let nextItemIndex = 0;
  const results: (R | null)[] = new Array(items.length);
  const queues: Promise<void>[] = [];

  const getNextItem = (): { hasMore: boolean; item?: T; index?: number } => {
    if (nextItemIndex >= items.length) {
      return { hasMore: false };
    }
    const item = items[nextItemIndex];
    const index = nextItemIndex;
    nextItemIndex++;
    return { hasMore: true, item, index };
  };

  for (let i = 0; i < concurrency; i++) {
    queues.push(
      (async () => {
        while (true) {
          const next = getNextItem();
          if (!next.hasMore) {
            break;
          }
          const { item, index } = next;
          results[index!] = await worker(item!, index!, i).catch((e) => {
            console.error(e);
            return null;
          });
        }
      })(),
    );
  }

  await Promise.all(queues);
  return results;
};

export function createConcurrentQueuesPerKey<TArgs extends any[], TRes = any>(
  keyGetter: (...args: TArgs) => string,
  queuesNumber: number,
  fn: AsyncFunction<TArgs, TRes>,
  opts?: CreateConcurrentQueuesOptions,
): AsyncFunction<TArgs, TRes> {
  const queues: Record<string, AsyncFunction<TArgs, TRes>> = {};

  return async (...args: TArgs) => {
    const key = keyGetter(...args);

    if (!queues[key]) {
      queues[key] = createConcurrentQueues(queuesNumber, fn, opts);
    }

    return queues[key](...args);
  };
}
