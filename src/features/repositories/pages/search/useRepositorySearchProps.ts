import { useState } from "react";
import { PromiseState } from "../../../../common/state/usePromiseState";
import { Repository } from "../../types";
import { useSearchRepositoriesClient } from "../../services/useSearchRepositoriesClient";
import { SearchClient } from "../../../../common/api/clients/SearchClient";

export const useRepositorySearchProps = (
  searchClient: SearchClient<Repository, unknown>
) => {
  const [query, setQuery] = useState("react");
  const [repositories, setRepositories] = useState<PromiseState<Repository[]>>({
    type: "pending",
  });

  useSearchRepositoriesClient(
    repositories,
    setRepositories,
    searchClient,
    query
  );

  return {
    query,
    repositories,
    onQueryChange: setQuery,
  };
};
