import { deepClone } from "../../deepClone";

export const testFirstLevel = (name: string, value: any) => {
  test(name, () => {
    const result = deepClone(value);

    expect(result).toEqual(value);
    expect(result).not.toStrictEqual(value);
  });
};
