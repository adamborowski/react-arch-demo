import { useCallback, useState } from "react";
import { Repository } from "../../types";
import { SearchClient } from "../../../../common/api/clients/SearchClient";
import { useQuery } from "../../../../common/services/useQuery";

export const useRepositorySearchProps = (
  searchClient: SearchClient<Repository>
) => {
  const [query, setQuery] = useState("react");

  const getData = useCallback(
    (signal: AbortSignal) => searchClient.search(query, signal),
    [query, searchClient]
  );

  const repositories = useQuery(getData);

  const onQueryChange = useCallback(
    (newQuery: string) => {
      if (query === newQuery) {
        void repositories.reload();
      } else {
        setQuery(newQuery);
      }
    },
    [query, repositories]
  );

  return {
    query,
    repositories: repositories.state,
    onQueryChange,
  };
};
