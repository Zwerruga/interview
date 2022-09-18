import { sqInRect } from "squares-in-rectangle";
import { squaresInRectangle } from "../squaresInRectangle";

describe("@SQUARES_IN_RECTANGLE test squaresInRectangle", () => {
  test("should return work correct with example", () => {
    expect(squaresInRectangle(5, 3)).toEqual([3, 2, 1, 1]);
    expect(squaresInRectangle(3, 5)).toEqual([3, 2, 1, 1]);
  });

  test("should return null if input arguments not vaild", () => {
    expect(squaresInRectangle(5, 5)).toEqual(null);
    expect(squaresInRectangle(0, 0)).toEqual(null);
  });

  describe("Random tests", () => {
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    for (let i = 0; i++ < 40;) {
      const randexp = randomInt(1, 2);
      const lng = randomInt(1, 2 * Math.pow(10, randexp));
      const wdth = randomInt(1, 2 * Math.pow(10, randexp));
      it("Testing for sqInRect(" + lng + ", " + wdth + ")", () => {
        expect(squaresInRectangle(lng, wdth)).toEqual(sqInRect(lng, wdth));
      });
    }
  });
});
