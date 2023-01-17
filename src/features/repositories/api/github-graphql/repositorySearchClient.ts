import { repositoryAdapter } from "./repositoryAdapter";
import { createGraphqlSearchClient } from "../../../../common/api/clients/graphqlSearchClient";

export const repositorySearchClient = createGraphqlSearchClient(
  "https://api.github.com/graphql",
  process.env.REACT_APP_GITHUB_TOKEN!,
  (query) => ({
    query: `query ($query: String!) {
  search(query: $query, type: REPOSITORY, first: 50) {
    repositoryCount
    nodes {
      ... on Repository {
        databaseId
        name
        owner {
          login
        }
        url
        description
        stargazerCount
        forkCount
      }
    }
  }
}`,
    variables: { query },
  }),
  repositoryAdapter
);
