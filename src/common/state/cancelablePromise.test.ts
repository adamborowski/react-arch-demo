import { cancelableWithAbortController } from "./cancelablePromise";

describe("cancelableWithAbortController", () => {
  it("should resolve when not cancelled", async () => {
    const abortController = new AbortController();
    const promise = cancelableWithAbortController(
      abortController,
      Promise.resolve("success")
    );
    await expect(promise).resolves.toEqual("success");
  });

  it("should not resolve and fire signal when cancelled", async () => {
    const abortController = new AbortController();
    const promise = cancelableWithAbortController(
      abortController,
      Promise.resolve("success")
    );
    promise.cancel();

    expect(abortController.signal.aborted).toBeTruthy();
    expect(promise.isCanceled()).toBeTruthy();
  });
});
