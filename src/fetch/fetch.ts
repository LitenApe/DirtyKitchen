import { backoff } from '../backoff';

type BackoffConfiguration = {
  attempts: number;
  delay: number;
};

/**
 * Thin wrapper around the global fetch function to assist with typing
 * and error handling. Throws an error of the response is not ok with
 * status code and text as error message.
 *
 * @param {RequestInfo} input
 * @param {RequestInit} init
 * @param {BackoffConfiguration} config
 * @returns
 */
export async function fetch<R>(
  input: RequestInfo,
  init?: RequestInit,
  config: BackoffConfiguration = { attempts: 3, delay: 300 },
): Promise<R> {
  const res = await backoff(
    callback(input, init),
    config.attempts,
    config.delay,
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch resource on ${input}. Responded with ${res.status}: ${res.statusText}`,
    );
  }

  return res.json();
}

/**
 * thin layer around fetch where it throws an error for everything
 * that is 500 or above, which usually indicates some complications
 * on the server side.
 *
 * @param {RequestInfo} input
 * @param {RequestInit} init
 * @returns {Response}
 */
function callback(
  input: RequestInfo,
  init?: RequestInit,
): () => Promise<Response> {
  return async (): Promise<Response> => {
    const res = await globalThis.fetch(input, init);

    if (!res.ok && res.status >= 500) {
      throw new Error(
        `Failed to fetch resource on ${input}. Responded with ${res.status}: ${res.statusText}`,
      );
    }

    return res;
  };
}
