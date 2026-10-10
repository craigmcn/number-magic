import { describe, expect, it } from "vitest";
import { shuffle } from ".";

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
