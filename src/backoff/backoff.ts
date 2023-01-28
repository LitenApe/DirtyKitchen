function invokeCallback<R>(f: () => Promise<R>, delay: number): Promise<R> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      f().then(resolve).catch(reject);
    }, delay);
  });
}

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
