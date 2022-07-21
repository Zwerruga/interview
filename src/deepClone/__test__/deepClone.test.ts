import { deepClone } from "../deepClone";

import { testPrimitive } from "./helpers/testPrimitive";

import { testEmpty } from "./helpers/testEmpty";

import { testFirstLevel } from "./helpers/testFirstLevel";

import { getByKeysFromClonedAndToCLone } from "./helpers/getByKeysFromClonedAndToCLone";

describe("@DEEP_CLONE test deepClone", () => {
  test("should return undefined if empty arguments", () => {
    const result = deepClone();

    expect(result).toBeUndefined();
  });

  testPrimitive("should clone number", Math.random());

  testPrimitive("should clone NaN", NaN);

  testPrimitive("should clone string", `${Math.random()}`);

  testPrimitive("should clone null", null);

  testPrimitive("should clone undefined", undefined);

  testPrimitive("should clone boolean true", true);

  testPrimitive("should clone boolean false", false);

  testEmpty("should clone empty array", []);

  testEmpty("should clone empty object", {});

  testEmpty("should clone empty Set", new Set());

  testEmpty("should clone empty Map", new Map());

  test("should clone Function", () => {
    const cloned = function sum(a: number, b: number) {
      return a + b;
    };

    const result = deepClone(cloned);

    const funcResult = cloned(1, 2);

    const clonedFuncResult = result?.(1, 2);

    expect(result).toBeInstanceOf(Function);
    expect(result).not.toStrictEqual(cloned);
    expect(funcResult).toEqual(clonedFuncResult);
  });

  test("should clone ArrowFunction", () => {
    const cloned = (a: number, b: number) => {
      return a + b;
    };

    const result = deepClone(cloned);

    const funcResult = cloned(1, 2);
    const clonedFuncResult = result?.(1, 2);

    expect(result).toBeInstanceOf(Function);
    expect(result).not.toStrictEqual(cloned);
    expect(funcResult).toEqual(clonedFuncResult);
  });

  testFirstLevel("should clone deep one level array", [
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

  testFirstLevel("should clone deep one level object", {
    key1: 1,
    [Math.random() + 1]: Math.random() + 15,
    key2: {},
    keyFunc: () => 3,
    key3: [],
    key4: null
  });

  testFirstLevel("should clone deep one level Set", new Set([1, 2, 3, 4, 5]));

  testFirstLevel(
    "should clone deep one level Map",
    new Map<any, any>([
      ["hello3", {}],
      ["hello", 1],
      ["hello2", 2],
      ["hello4", []]
    ])
  );

  test("should clone low leveled object", () => {
    const toClone = {
      key1: 1,
      key2_1: "key35",
      key2_2: "35",
      key3: null,
      key4: NaN,
      key5: [1, 2, 3, 4],

      level2: {
        go: {
          fast: true,
          lowLevel: ["yes"],
          perfect: {
            fn: () => 6,
            cool: true,
            funny: new Set([1, 4, 5])
          },
          fn() {
            return Math.random();
          }
        }
      }
    };

    const result: typeof toClone = deepClone(
      toClone
    ) as unknown as typeof toClone;

    const level2 = getByKeysFromClonedAndToCLone(toClone, result, ["level2"]);

    const level2_go = getByKeysFromClonedAndToCLone(toClone, result, [
      "level2",
      "go"
    ]);

    const level2_go_lowLevel = getByKeysFromClonedAndToCLone(toClone, result, [
      "level2",
      "go",
      "lowLevel"
    ]);

    const level2_go_perfect = getByKeysFromClonedAndToCLone(toClone, result, [
      "level2",
      "go",
      "perfect"
    ]);

    const level2_go_perfect_funny = getByKeysFromClonedAndToCLone(
      toClone,
      result,
      ["level2", "go", "perfect", "funny"]
    );

    expect(result).toEqual(toClone);
    expect(result).not.toStrictEqual(toClone);

    [
      level2,
      level2_go,
      level2_go_lowLevel,
      level2_go_perfect,
      level2_go_perfect_funny
    ].map((values) => {
      expect(values[0]).not.toStrictEqual(values[1]);
    });
  });

  test("should clone high object", () => {
    const toClone = {
      a: 1,
      b: 2,
      c: 5,
      level2: {
        n: "dsdsd",
        h() {
          console.log("Hello");
        },
        level3: {
          a: ["dsdsd", "dsds", 1, 5, new Set([1, "d", 15]), [1, 5, 56, 9, 32]],
          level4: {
            map: new Map([
              [
                { id: 15, slug: "hello_world" },
                { level5: { func: () => 1 + 2 } }
              ]
            ])
          },

          level4_2: {
            arr: [[], [1, 3], [[18, [[[32, [() => "level10"]]]]]]]
          }
        }
      }
    };

    const result: typeof toClone = deepClone(toClone);

    const level2 = getByKeysFromClonedAndToCLone(toClone, result, ["level2"]);

    const level2_h = getByKeysFromClonedAndToCLone(toClone, result, [
      "level2",
      "h"
    ]);

    const level2__level3 = getByKeysFromClonedAndToCLone(toClone, result, [
      "level2",
      "level3"
    ]);

    const level2__level3_a = getByKeysFromClonedAndToCLone(toClone, result, [
      "level2",
      "level3",
      "a"
    ]);

    const level2__level3_a_5 = getByKeysFromClonedAndToCLone(toClone, result, [
      "level2",
      "level3",
      "a",
      "5"
    ]);

    const level2__level3_level4_map = getByKeysFromClonedAndToCLone(
      toClone,
      result,
      ["level2", "level3", "level4", "map"]
    );

    const deepArray = getByKeysFromClonedAndToCLone(toClone, result, [
      "level2",
      "level3",
      "level4_2",
      "2",
      "0",
      "1"
    ]);

    expect(result).toEqual(toClone);
    expect(result).not.toStrictEqual(toClone);

    [
      level2,
      level2_h,
      level2__level3,
      level2__level3_a,
      level2__level3_a_5,
      level2__level3_level4_map,
      deepArray
    ].map((values) => {
      expect(values[0]).not.toStrictEqual(values[1]);
    });
  });
});
