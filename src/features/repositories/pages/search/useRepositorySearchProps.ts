import { useEffect, useState } from "react";
import { PromiseState } from "../../../../common/state/usePromiseState";
import { Repository } from "../../types";
import { useSearchRepositoriesClient } from "../../services/useSearchRepositoriesClient";
import { SearchClient } from "../../../../common/api/clients/SearchClient";

export const useRepositorySearchProps = (
  searchClient: SearchClient<Repository>
) => {
  const [query, setQuery] = useState("react");
  const [repositories, setRepositories] = useState<PromiseState<Repository[]>>({
    type: "pending",
  });

  const searchRepositories = useSearchRepositoriesClient(
    repositories,
    setRepositories,
    searchClient
  );

  useEffect(() => {
    void searchRepositories.search(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    query,
    repositories,
    onQueryChange: (query: string) => {
      setQuery(query);
      void searchRepositories.search(query);
    },
  };
};
