import { useCallback, useEffect, useRef, useState } from "react";
import { PromiseState } from "../state/usePromiseState";
import CancelablePromise from "cancelable-promise";
import { cancelableWithAbortController } from "../state/cancelablePromise";

export const useQuery = <Data>(
  getData: (signal: AbortSignal) => Promise<Data>
) => {
  const [state, setState] = useState<PromiseState<Data>>({
    type: "pending",
  });
  const lastPromise = useRef<CancelablePromise | null>(null);
  const lastState = useRef(state);

  const reload = useCallback(async () => {
    const abortController = new AbortController();
    lastPromise.current?.cancel();
    lastState.current.type !== "pending" && setState({ type: "pending" }); // avoid extra render, read state by ref
    try {
      lastPromise.current = cancelableWithAbortController(
        abortController,
        getData(abortController.signal)
      );

      const fetchedResult = await lastPromise.current;
      setState({ type: "loaded", data: fetchedResult });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        // ignore this error, we are already in loading state due to the new fetch
      } else {
        setState({
          type: "error",
          message: String(e),
        });
      }
    }
  }, [getData]);

  useEffect(() => {
    void reload();

    return () => {
      lastPromise.current?.cancel();
    };
  }, [reload]);

  lastState.current = state;

  return { state, reload };
};
