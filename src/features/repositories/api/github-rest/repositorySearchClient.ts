import { createFetchSearchClient } from "../../../../common/api/clients/fetchSearchClient";
import { repositoryAdapter } from "./repositoryAdapter";

export const repositorySearchClient = createFetchSearchClient(
  (query) => `https://api.github.com/search/repositories?q=${query}`,
  process.env.REACT_APP_GITHUB_TOKEN!,
  repositoryAdapter
);
