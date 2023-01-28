function invokeCallback<R>(f: () => Promise<R>, delay: number): Promise<R> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      f().then(resolve).catch(reject);
    }, delay);
  });
}

/**
 * Attempt to invoke a given callback x amount of times, with an increasing
 * delay between each time which grows exponentially
 *
 * @param f callback which you want to invoke
 * @param attempts number of retries
 * @param delay milliseconds before attempting to invoke the callback again
 * @returns resolved value from callback if successful
 */
export async function backoff<R>(
  f: () => Promise<R>,
  attempts: number,
  delay: number,
): Promise<R> {
  const errs = [];

  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await invokeCallback(f, (i - 1) * delay);
      return res;
    } catch (err) {
      console.warn(`Failed to execute ${f.name}`);
      errs.push(err);
    }
  }

  throw errs;
}
