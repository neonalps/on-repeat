import { describe, expect, test } from '@jest/globals';
import { getAuthHeader } from "./spotify";

describe('Oauth - Spotify', () => {
  test('returns correct auth header', () => {
    expect(getAuthHeader("client", "secret")).toBe("Y2xpZW50OnNlY3JldA==");
    expect(getAuthHeader("", "")).toBe("Og==");
  });
});