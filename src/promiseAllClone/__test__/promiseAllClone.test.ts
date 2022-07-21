import { PromiseAllClone } from "../promiseAllClone";

import { getPromise } from "./helpers/getPromise";

describe("@PROMISE_ALL_CLONE test PromiseAllClone", () => {
  test("should return Promise", () => {
    const result = PromiseAllClone([]);

    expect(result).toBeInstanceOf(Promise);
  });

  test("should resolve when all Promises in passed array resolves", async () => {
    const mockFn = jest.fn();

    const promises = Array.from({ length: 3 }, () =>
      getPromise({ onResolve: mockFn })
    );

    await PromiseAllClone(promises);

    expect(mockFn.mock.calls.length).toBe(3);
  });

  test("should keep the order of the results", async () => {
    const resolveValues = Array.from(
      { length: 3 },
      (_, i) => Math.random() + i + 1
    );

    const promises = Array.from({ length: 3 }, (_, i) =>
      getPromise({ resolveValue: resolveValues[i] })
    );

    const result = await PromiseAllClone(promises);

    expect(result).toEqual(resolveValues);
  });

  test("should reject if one of passed Promises reject with this error", async () => {
    const errorMsg = `Reject error #${Math.random()}`;

    const promises = Array.from({ length: 2 }, (_, i) => getPromise({})).concat(
      getPromise({ rejectOption: { msg: errorMsg } })
    );

    expect(PromiseAllClone(promises)).rejects.toEqual(errorMsg);
  });

  test("should throw first rejected if one of passed Promises reject with this error", async () => {
    const errorMsg = `Reject error #${Math.random()}`;

    const errorFirstMsg = `Reject first error #${Math.random()}`;

    const promises = [
      getPromise({}),
      getPromise({ delayMs: 100, rejectOption: { msg: errorFirstMsg } }),
      getPromise({ delayMs: 200, rejectOption: { msg: errorMsg } })
    ];

    expect(PromiseAllClone(promises)).rejects.toEqual(errorFirstMsg);
  });
});
