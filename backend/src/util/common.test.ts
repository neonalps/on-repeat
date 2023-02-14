import { describe, expect, test } from '@jest/globals';
import { generateRandomString } from "./common";

describe('Util - common', () => {
  test('returns random string of expected length', () => {
    const inputGenerator = [0, 1, 10, 1000];

    for (const input of inputGenerator) {
        expect(generateRandomString(input).length).toBe(input);
    }   
  });
});