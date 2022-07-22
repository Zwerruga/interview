export const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getPromise = ({
  resolveValue = null,
  delayMs,
  onResolve,
  rejectOption
}: {
  resolveValue?: unknown;
  delayMs: number;
  onResolve?: (value?: unknown) => void;
  rejectOption?: {
    msg: string;
    onReject?: (value?: unknown) => void;
  };
}) =>
  new Promise((resolve, reject) => {
    delay(delayMs).then(() => {
      if (rejectOption) {
        rejectOption.onReject?.(resolveValue);
        reject(rejectOption.msg);
        return;
      }

      onResolve?.(resolveValue);
      resolve(resolveValue);
    });
  });
