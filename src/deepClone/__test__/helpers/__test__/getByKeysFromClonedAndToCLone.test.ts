import { getByKeysFromClonedAndToCLone } from "../getByKeysFromClonedAndToCLone";

describe("test getByKeysFromClonedAndToCLone", () => {
  test("should return values by keys from objects", () => {
    const obj1 = { a: { b: Math.random() } };
    const obj2 = obj1;

    const [value1, value2] = getByKeysFromClonedAndToCLone(obj1, obj2, [
      "a",
      "b"
    ]);

    expect(value1).toBe(value2);
    expect(value1).toBe(obj1.a.b);
  });

  test("should throw error if not exist in first or second object", () => {
    const obj1 = { a: { b: Math.random() } };
    const obj2: typeof obj1 = {
      a: { c: Math.random() + 1 }
    } as unknown as typeof obj1;

    expect(
      getByKeysFromClonedAndToCLone.bind(null, obj1, obj2, ["a", "c"])
    ).toThrow(`Key: c doesn't exist in object \n${JSON.stringify(obj1.a)}`);

    expect(
      getByKeysFromClonedAndToCLone.bind(null, obj1, obj2, ["a", "b"])
    ).toThrow(`Key: b doesn't exist in object \n${JSON.stringify(obj2.a)}`);
  });
});
