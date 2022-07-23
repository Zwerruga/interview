import { deepClone } from "../deepClone";

export const testOneLevelNesting = (name: string, value: any) => {
  test(name, () => {
    const result = deepClone(value);

    const isStrictEqual = value === result;

    expect(result).toEqual(value);
    expect(isStrictEqual).toBeFalsy();
  });
};

describe("@DEEP_CLONE test deepClone", () => {
  testOneLevelNesting("should clone deep one level array", [
    1,
    2,
    3,
    "dsdsd",
    {},
    null,
    undefined,
    undefined,
    null,
    Math.random(),
    []
  ]);

  testOneLevelNesting(
    "should clone deep one level Set",
    new Set([1, 2, 3, 4, 5])
  );

  testOneLevelNesting(
    "should clone deep one level Map",
    new Map<any, any>([
      ["hello3", {}],
      ["hello", 1],
      ["hello2", 2],
      ["hello4", []]
    ])
  );

  test("should clone deep one level object", () => {
    const toClone = {
      key1: 1,
      [Math.random() + 1]: Math.random() + 15,
      key2: {},
      keyFunc: () => 3,
      key3: [],
      key4: null
    };

    const result = deepClone(toClone);

    const isStrictEqual = result === toClone;

    expect(JSON.stringify(result)).toEqual(JSON.stringify(toClone));
    expect(isStrictEqual).toBeFalsy();
  });
});
