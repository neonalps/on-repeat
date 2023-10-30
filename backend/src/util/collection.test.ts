import { describe, expect, test } from '@jest/globals';
import { setEquals } from "./collection";

describe('Util - collection', () => {
  test('returns true if all elements of the set are equal', () => {
    const first = new Set(["a", "b", "c"]);
    const second = new Set(["c", "a", "b"]);

    expect(setEquals(first, second)).toBe(true);
  });

  test('returns false if not all elements of the set are equal', () => {
    const first = new Set(["a", "b", "c", "d"]);
    const second = new Set(["c", "a", "b"]);

    expect(setEquals(first, second)).toBe(false);
  });

  test('returns false if elements are equal but of different type', () => {
    const first: any = new Set([1, 2, 3]);
    const second: any = new Set(["1", "2", "3"]);

    expect(setEquals(first, second)).toBe(false);
  });

  test('returns false if one or both sets are null or undefined', () => {
    const valid = new Set([1, 2, 3]);

    const inputGenerator: any = [
        {
            first: null,
            second: valid,
        },
        {
            first: valid,
            second: undefined,
        },
        {
            first: null,
            second: null,
        },
        {
            first: undefined,
            second: undefined,
        },
        {
            first: null,
            second: undefined,
        },
    ];

    for (const input of inputGenerator) {
        expect(setEquals(input.first, input.second)).toBe(false);
    }
  });
});