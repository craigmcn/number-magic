export * from "./game";

export const DURATION = 450;

export const MAX_NUMBER = 63;

// Card k lists every number with bit k set, so the first numbers of the cards a number
// appears on add up to that number. Six cards cover 1–63.
export const NUMBERS = [1, 2, 4, 8, 16, 32].map((bit) =>
  Array.from({ length: MAX_NUMBER }, (_, i) => i + 1).filter((n) => n & bit),
);
