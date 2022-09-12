/**
 * Retrieve a random item from the supplied list
 * @param arr list of items we want to extract an element from
 * @returns random item from supplied list
 */
export function random<T>(arr: Array<T>): T;
/**
 * Retrieve a random number between two boundary values
 * @param {number} min minimum value to be returned
 * @param {number} max maximum value to be returned
 * @param {boolean} floor a flag to decide if the function should remove decimals
 */
export function random(min: number, max: number, floor?: boolean): number;
export function random<T>(
  arrOrMin: Array<T> | number,
  max?: number,
  floor?: boolean,
): T | number {
  const isArray = Array.isArray(arrOrMin);

  if (isArray) {
    const arr = arrOrMin;
    return arr[random(0, arrOrMin.length - 1, true)];
  } else if (typeof arrOrMin === 'number' && typeof max === 'number') {
    const min = arrOrMin;
    const number = Math.random() * (max - min) + min;
    return floor ? Math.floor(number) : number;
  } else {
    throw new Error(
      'Invalid arguments! Either provide an array or boundary values',
    );
  }
}
