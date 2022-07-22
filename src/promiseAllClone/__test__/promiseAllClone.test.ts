import { PromiseAllClone } from "../promiseAllClone";

import { getPromise } from "./helpers/getPromise";

describe("@PROMISE_ALL_CLONE test PromiseAllClone", () => {
  test("should return Promise", () => {
    const result = PromiseAllClone([]);

    expect(result).toBeInstanceOf(Promise);
  });

  test("should return wrapped Promise.resolve, if any received in array not promise", async () => {
    const notPromises = Array.from({ length: 3 }, () => Math.random());

    const result = await PromiseAllClone(notPromises);

    expect(result).toEqual(notPromises);
  });

  test("should resolve when all Promises in passed array resolves", async () => {
    const mockFn = jest.fn();

    const delayMs = 200;

    const promises = Array.from({ length: 3 }, () =>
      getPromise({ delayMs, onResolve: mockFn })
    );

    await PromiseAllClone(promises);

    expect(mockFn.mock.calls.length).toBe(3);
  });

  test("should all promises run at one times", (done) => {
    const countOfPromises = 10;

    const delayMs = 200;

    const timeToCheck = delayMs * 2;

    const doSomething = jest.fn();

    const promises = Array.from({ length: countOfPromises }, () =>
      getPromise({ delayMs })
    );

    setTimeout(() => {
      expect(doSomething.mock.calls.length).toEqual(1);
      done();
    }, timeToCheck);

    PromiseAllClone(promises).then(() => {
      doSomething();
      done();
    });
  });

  test("should keep the order of the results", async () => {
    const resolveValues = Array.from(
      { length: 3 },
      (_, i) => Math.random() + i + 1
    );

    const delayMs = 200;

    const promises = Array.from({ length: 3 }, (_, i) =>
      getPromise({ delayMs, resolveValue: resolveValues[i] })
    );

    const result = await PromiseAllClone(promises);

    expect(result).toEqual(resolveValues);
  });

  test("should reject if one of passed Promises reject with this error", async () => {
    expect.assertions(1);

    const errorMsg = `Reject error #${Math.random()}`;

    const delayMs = 200;

    const promises = Array.from({ length: 2 }, (_, i) =>
      getPromise({ delayMs })
    ).concat(getPromise({ delayMs, rejectOption: { msg: errorMsg } }));

    try {
      await PromiseAllClone(promises);
    } catch (err) {
      expect(err).toEqual(errorMsg);
    }
  });

  test("should throw first rejected if one of passed Promises reject with this error", async () => {
    expect.assertions(1);

    const errorMsg = `Reject error #${Math.random()}`;

    const errorFirstMsg = `Reject first error #${Math.random()}`;

    const defaultDelayMs = 200;

    const fastDelayMs = defaultDelayMs / 2;

    const promises = [
      getPromise({ delayMs: defaultDelayMs }),
      getPromise({
        delayMs: fastDelayMs,
        rejectOption: { msg: errorFirstMsg }
      }),
      getPromise({ delayMs: defaultDelayMs, rejectOption: { msg: errorMsg } })
    ];

    try {
      await PromiseAllClone(promises);
    } catch (err) {
      expect(err).toEqual(errorFirstMsg);
    }
  });
});
