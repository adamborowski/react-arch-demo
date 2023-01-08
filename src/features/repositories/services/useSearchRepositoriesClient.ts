import { PromiseState } from "../../../common/state/usePromiseState";
import { Repository } from "../types";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { SearchClient } from "../../../common/api/clients/SearchClient";
import CancelablePromise from "cancelable-promise";
import { cancelableWithAbortController } from "../../../common/state/cancelablePromise";

export const useSearchRepositoriesClient = (
  // TODO abstract from Repository[]
  state: PromiseState<Repository[]>,
  onStateChange: Dispatch<SetStateAction<PromiseState<Repository[]>>>,
  client: SearchClient<Repository, number>
) => {
  const lastPromise = useRef<CancelablePromise | null>(null);

  const search = useCallback(
    async (query: string) => {
      lastPromise.current?.cancel();
      onStateChange({ type: "pending" });
      try {
        const abortController = new AbortController();
        lastPromise.current = cancelableWithAbortController(
          abortController,
          client.search(query, abortController, 0)
        );

        const fetchedResult = await lastPromise.current; //todo cursors!
        onStateChange({ type: "loaded", data: fetchedResult });
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          // ignore this error, we are already in loading state due to the new fetch
        } else {
          onStateChange({
            type: "error",
            message: String(e),
          });
        }
      }
    },
    [client, onStateChange]
  );

  // when unmounting, do not wait for the promise anymore
  useEffect(() => {
    return () => {
      lastPromise.current?.cancel();
    };
  }, []);

  return { search };
};
