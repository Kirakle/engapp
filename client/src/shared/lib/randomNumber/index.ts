let previousResult: number | null = null;

export function getRandomNumber(max: number) {
  if (max <= 1) {
    return Math.floor(Math.random() * max);
  }

  let result;
  do {
    result = Math.floor(Math.random() * max);
  } while (result === previousResult);

  previousResult = result;
  return result;
}
