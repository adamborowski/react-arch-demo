import { cancelable } from "cancelable-promise";

// Utility for common cases where we want to cancel fetching but the promise can be composed of others,
// so we need a combination of ignoring the promise result and aborting the abort able (fetch) operation
export const cancelableWithAbortController = <T>(
  abortController: AbortController,
  promise: Promise<T>
) => {
  const cancelablePromise = cancelable(promise);
  const originalCancel = cancelablePromise.cancel;

  return Object.assign(cancelablePromise, {
    cancel: () => {
      originalCancel();
      abortController.abort();
    },
    abortController,
  });
};
