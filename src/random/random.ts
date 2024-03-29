function randomNumber(min: number, max: number, round?: boolean): number {
  const number = Math.random() * (max - min) + min;
  return round ? Math.round(number) : number;
}

function randomArrayElement<T>(array: Array<T>): T {
  const min = 0;
  const max = array.length - 1;
  const index = randomNumber(min, max, true);
  return array[index];
}

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
 * @param {boolean} round a flag to decide if the function should round to closes integer
 */
export function random(min: number, max: number, round?: boolean): number;
export function random<T>(
  arrOrMin: Array<T> | number,
  max?: number,
  round?: boolean,
): T | number {
  const isArray = Array.isArray(arrOrMin);

  if (isArray) {
    return randomArrayElement(arrOrMin);
  } else if (typeof arrOrMin === 'number' && typeof max === 'number') {
    return randomNumber(arrOrMin, max, round);
  } else {
    throw new Error(
      'Invalid arguments! Either provide an array or boundary values',
    );
  }
}
