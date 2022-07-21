import { deepClone } from "../../deepClone";

export const testEmpty = (name: string, value: any) => {
  test(name, () => {
    const result = deepClone(value);

    expect(result).toEqual(value);
    expect(result).not.toStrictEqual(value);
  });
};
