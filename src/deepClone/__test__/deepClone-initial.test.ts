import { deepClone } from "../deepClone";

describe("@DEEP_CLONE initial test deepClone ", () => {
  test("should be function ", () => {
    expect(deepClone).toBeInstanceOf(Function);
  });

  test("should return undefined if empty arguments", () => {
    const result = deepClone();

    expect(result).toBeUndefined();
  });
});
