import { describe, it, expect } from 'vitest';
import { sliceRandomElement } from '.';

const testArray = [1, 2, 3, 4, 5];

describe('sliceRandomElement', () => {
  it('slices an element from the array', () => {
    const newArray = sliceRandomElement(testArray);

    expect(newArray.array.length).toBe(testArray.length - 1);
    expect(testArray.includes(newArray.element)).toBe(true);
    expect(newArray.array.includes(newArray.element)).toBe(false);
    expect([newArray.element, ...newArray.array].sort()).toStrictEqual(testArray.sort());
  });
});
