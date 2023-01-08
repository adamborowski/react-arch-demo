import { repositoryAdapter } from "./repositoryAdapter";
import { createGraphqlSearchClient } from "../../../../common/api/clients/graphqlSearchClient";

export const repositorySearchClient = createGraphqlSearchClient(
  "https://api.github.com/graphql",
  "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",
  repositoryAdapter
);
