import { deepClone } from "../deepClone";

describe("@DEEP_CLONE test deepClone with functions", () => {
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
    expect(result.name).toEqual(cloned.name);
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
    expect(result.name).toEqual(cloned.name);
  });
});
