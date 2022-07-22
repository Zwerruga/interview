import { deepClone } from "../../deepClone";

export const testFirstLevel = (name: string, value: any) => {
  test(name, () => {
    const result = deepClone(value);

    const isStrictEqual = value === result;

    expect(result).toEqual(value);
    expect(isStrictEqual).toBeFalsy();
  });
};
