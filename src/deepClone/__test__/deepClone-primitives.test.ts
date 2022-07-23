import { deepClone } from "../deepClone";

export const testPrimitive = (name: string, value: any) => {
  test(name, () => {
    const result = deepClone(value);

    expect(result).toBe(value);
  });
};

describe("@DEEP_CLONE test deepClone with primitives", () => {
  testPrimitive("should clone number", Math.random());

  testPrimitive("should clone NaN", NaN);

  testPrimitive("should clone string", `${Math.random()}`);

  testPrimitive("should clone null", null);

  testPrimitive("should clone undefined", undefined);

  testPrimitive("should clone boolean true", true);

  testPrimitive("should clone boolean false", false);
});
