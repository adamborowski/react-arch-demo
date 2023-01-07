import { createFetchSearchClient } from "../../../../common/api/clients/fetchSearchClient";
import { repositoryAdapter } from "./repositoryAdapter";

export const repositorySearchClient = createFetchSearchClient(
  (query, page) => `https://api.github.com/search/repositories?q=${query}`,
  "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",
  repositoryAdapter
);
