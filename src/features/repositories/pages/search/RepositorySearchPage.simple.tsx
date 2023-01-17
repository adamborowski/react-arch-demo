import { FC, useState } from "react";
import { RepositorySearchPagePure } from "./RepositorySearchPage.pure";
import { repositoryAdapter } from "../../api/github-graphql/repositoryAdapter";
import { QueryFunctionContext, useQuery } from "react-query";
import { getPromiseStateFromQueryState } from "../../../../common/utils/react-query";

const getQueryFn =
  (query: string) =>
  async ({ signal }: QueryFunctionContext) => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_GITHUB_TOKEN,
        "Content-Type": "application/json",
      },
      signal,
      body: JSON.stringify({
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
    });
    const json = await response.json();
    const serverResponse = repositoryAdapter.parse(json);
    return repositoryAdapter.serverToClient(serverResponse);
  };

export const RepositorySearchPageSimple: FC = () => {
  const [query, setQuery] = useState("react");

  const { status, data, error } = useQuery({
    queryKey: ["repositories-search", query],
    queryFn: getQueryFn(query),
  });

  return (
    <RepositorySearchPagePure
      query={query}
      repositories={getPromiseStateFromQueryState(status, error, data)}
      onQueryChange={setQuery}
    />
  );
};
