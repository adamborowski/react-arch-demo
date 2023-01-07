import { PromiseState } from "../../../common/state/usePromiseState";
import { Repository } from "../types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SearchClient } from "../../../common/api/clients/SearchClient";

export const useSearchRepositories = (
  state: PromiseState<Repository[]>,
  onStateChange: Dispatch<SetStateAction<PromiseState<Repository[]>>>,
  client: SearchClient<Repository, number>,
  query: string
) => {
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      onStateChange({ type: "pending" });
      try {
        const fetchedResult = await client.search(query, abortController, 0); //todo cursors!
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
    })();
    return () => abortController.abort();
  }, [query, client, onStateChange]);
};
