import { deepClone } from "../deepClone";

import { testPrimitive } from "./helpers/testPrimitive";

import { testEmpty } from "./helpers/testEmpty";

import { testFirstLevel } from "./helpers/testFirstLevel";

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
    const toClone: any = {
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

    const result = deepClone(toClone);

    expect(result).toEqual(toClone);
  });

  test("should clone high object", () => {
    const toClone: any = {
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

    const result = deepClone(toClone);

    expect(result).toEqual(toClone);
  });
});
