import { deepClone } from "../../deepClone";

export const testEmpty = (name: string, value: any) => {
  test(name, () => {
    const result = deepClone(value);

    const isStrictEqual = value === result;

    expect(result).toEqual(value);
    expect(isStrictEqual).toBeFalsy();
  });
};

describe("@DEEP_CLONE test deepClone with complex types empty implementation", () => {
  testEmpty("should clone empty array", []);

  testEmpty("should clone empty object", {});

  testEmpty("should clone empty Set", new Set());

  testEmpty("should clone empty Map", new Map());
});
