import { deepClone } from "../deepClone";

import { getByKeysFromClonedAndToCLone } from "./helpers/getByKeysFromClonedAndToCLone";

describe("@DEEP_CLONE test deepClone", () => {
  test("should clone deep some level Set", () => {
    const toClone = new Set([1, {}, [1, 2, 3], 4, 5]);

    const result = deepClone(toClone);

    const isStrictEqual = result === toClone;

    const [resultArray, toCloneArray] = [[...result], [...toClone]];

    const isValuesStrictEqual =
      toCloneArray[1] === resultArray[1] || toCloneArray[2] === resultArray[2];

    expect(result).toEqual(toClone);
    expect(isStrictEqual).toBeFalsy();
    expect(isValuesStrictEqual).toBeFalsy();
  });

  test("should clone deep some level Map", () => {
    const toClone = new Map<any, any>([
      ["hello3", {}],
      ["hello", 1],
      ["hello2", 2],
      [{ hello: "world" }, []]
    ]);

    const result = deepClone(toClone);

    const isStrictEqual = result === toClone;

    const isValuesStrictEqual =
      [...toClone.keys()][toClone.size - 1] ===
        [...result.keys()][result.size - 1] ||
      toClone.get("hello3") === result.get("hello3");

    expect(result).toBeInstanceOf(Map);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(toClone));
    expect(isStrictEqual).toBeFalsy();
    expect(isValuesStrictEqual).toBeFalsy();
  });

  test("should clone some leveled object", () => {
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

    const isStrictEqual = result === toClone;

    expect(JSON.stringify(result)).toEqual(JSON.stringify(toClone));
    expect(isStrictEqual).toBeFalsy();

    [
      level2,
      level2_go,
      level2_go_lowLevel,
      level2_go_perfect,
      level2_go_perfect_funny
    ].map((values) => {
      const isStrictEqual = values[0] === values[1];

      expect(isStrictEqual).toBeFalsy();
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
      5
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
      "arr",
      2,
      0,
      1
    ]);

    const isStrictEqual = result === toClone;

    expect(JSON.stringify(result)).toEqual(JSON.stringify(toClone));
    expect(isStrictEqual).toBeFalsy();

    [
      level2,
      level2_h,
      level2__level3,
      level2__level3_a,
      level2__level3_a_5,
      level2__level3_level4_map,
      deepArray
    ].map((values) => {
      const isStrictEqual = values[0] === values[1];

      expect(isStrictEqual).toBeFalsy();

      expect(values[0].prototype).toEqual(values[1].prototype);
    });

    expect(level2_h[0].name).toEqual(level2_h[1].name);
  });
});
