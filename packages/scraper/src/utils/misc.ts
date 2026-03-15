export const sleep = (time: number) => new Promise<void>((done) => setTimeout(done, time));
