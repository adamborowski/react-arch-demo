// istanbul ignore file

import { SearchClient } from "./SearchClient";
import { Adapter } from "./Adapter";
import { ZodError } from "zod";

// todo make abstract to satisfy any graphql query in the future
// for now make it search specific
// or: consider moving the entire client to feature folder
export const createGraphqlSearchClient = <ServerType, ClientType>(
  base: string,
  token: string,
  adapter: Adapter<ServerType, ClientType>
): SearchClient<ClientType> => ({
  search: async (query, abortController) => {
    const gql = {
      // TODO inject specific query from external
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
    pageInfo {
      endCursor
      startCursor
    }
  }
}`,
      variables: { query },
    };
    const response = await fetch(base, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      signal: abortController?.signal,
      body: JSON.stringify(gql),
    });
    const json = await response.json();

    try {
      const serverResponse = adapter.parse(json);
      return adapter.serverToClient(serverResponse);
    } catch (e) {
      if (e instanceof ZodError) {
        // FIXME this might be specific to adapter not client
        throw new Error(
          e.issues.map((i) => `${i.path}: ${i.message}`).join("\n")
        );
      }
      throw e;
    }
  },
});
