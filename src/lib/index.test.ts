import { describe, expect, it } from "vitest";
import { MAX_NUMBER, NUMBERS, shuffle } from ".";

const testArray = [1, 2, 3, 4, 5];

describe("shuffle", () => {
  it("returns a new array with the same elements", () => {
    const shuffled = shuffle(testArray);

    expect(shuffled).not.toBe(testArray);
    expect([...shuffled].sort()).toStrictEqual(testArray);
  });

  it("leaves the input untouched", () => {
    const input = [...testArray];
    shuffle(input);

    expect(input).toStrictEqual(testArray);
  });
});

describe("NUMBERS", () => {
  it("has six cards of 32 numbers, each led by its power of two", () => {
    expect(NUMBERS).toHaveLength(6);
    NUMBERS.forEach((card, k) => {
      expect(card).toHaveLength(32);
      expect(card[0]).toBe(2 ** k);
    });
  });

  it("reveals every number from 1 to 63 by adding the cards it is on", () => {
    for (let n = 1; n <= MAX_NUMBER; n += 1) {
      const total = NUMBERS.filter((card) => card.includes(n)).reduce(
        (sum, [first = 0]) => sum + first,
        0,
      );

      expect(total).toBe(n);
    }
  });

  it("only contains numbers from 1 to 63", () => {
    expect(NUMBERS.flat().every((n) => n >= 1 && n <= MAX_NUMBER)).toBe(true);
  });
});
