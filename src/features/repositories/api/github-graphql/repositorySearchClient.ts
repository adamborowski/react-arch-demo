import { repositoryAdapter } from "./repositoryAdapter";
import { createGraphqlSearchClient } from "../../../../common/api/clients/graphqlSearchClient";

export const repositorySearchClient = createGraphqlSearchClient(
  "https://api.github.com/graphql",
  process.env.REACT_APP_GITHUB_TOKEN!,
  repositoryAdapter
);
