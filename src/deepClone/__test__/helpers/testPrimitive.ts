import { deepClone } from "../../deepClone";

export const testPrimitive = (name: string, value: any) => {
  test(name, () => {
    const result = deepClone(value);

    expect(result).toBe(value);
  });
};
