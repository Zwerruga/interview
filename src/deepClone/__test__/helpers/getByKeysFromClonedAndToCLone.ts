const getByKeySequence = (obj: any, keys: string[]): any => {
  if (keys.length === 0) return obj;

  if (obj[keys[0]]) {
    return getByKeySequence(obj[keys[0]], keys.slice(1));
  }

  throw `Key: ${keys[0]} doesn't exist in object \n${JSON.stringify(obj)}`;
};

export const getByKeysFromClonedAndToCLone = <T>(
  obj1: T,
  obj2: T,
  keys: string[]
): [any, any] => {
  return [getByKeySequence(obj1, keys), getByKeySequence(obj2, keys)];
};
