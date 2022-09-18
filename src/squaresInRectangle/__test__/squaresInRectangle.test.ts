import { squaresInRectangle } from "../squaresInRectangle";
import { cases } from "./helper/cases";

describe("@SQUARES_IN_RECTANGLE test squaresInRectangle", () => {
  test("should return work correct with example", () => {
    expect(squaresInRectangle(5, 3)).toEqual([3, 2, 1, 1]);
    expect(squaresInRectangle(3, 5)).toEqual([3, 2, 1, 1]);
  });

  test("should return null if input arguments not vaild", () => {
    expect(squaresInRectangle(5, 5)).toEqual(null);
    expect(squaresInRectangle(3, 3)).toEqual(null);
    expect(squaresInRectangle(0, 0)).toEqual(null);
  });

  describe("some tests", () => {
    for (const testCase of cases) {
      test(`Testing for squaresInRectangle(${testCase.arguments[0]}, ${testCase.arguments[1]})`, () => {
        expect(squaresInRectangle(...testCase.arguments)).toEqual(
          testCase.result
        );
      });
    }
  });
});
