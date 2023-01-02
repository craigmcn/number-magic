export const DURATION = 450;

export const sliceRandomElement = <T>(array: T[]) => {
  const randomIndex = ~~(Math.random() * array.length);
  const randomElement = array[randomIndex];
  return {
    element: randomElement,
    array: array.filter((_, i) => i !== randomIndex),
  };
};
