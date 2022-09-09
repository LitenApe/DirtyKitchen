/**
 * Used to keep an history of used id's to
 * avoid conflicts and always start on "1"
 * with new prefixes.
 */
const dirtyIdHistory: {[key: string]: number} = {};

/**
 * Generates a unique ID and prefixes the supplied
 * string to it.
 * @param {string} prefix Prefix for the ID. Defaults to "dirty_"
 * @returns {string} Returns the unique ID.
 * 
 * @example
 * dirtyIds(); // => "dirty_1"
 * dirtyIds("user_"); // "user_1"
 */
export function uniqueId(prefix: string = "dirty_"): string {
  if (!dirtyIdHistory[prefix]) {
    dirtyIdHistory[prefix] = 0;
  }

  return `${prefix}${++dirtyIdHistory[prefix]}`;
}
