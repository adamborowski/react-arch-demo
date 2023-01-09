import { SearchClient } from "../../../../common/api/clients/SearchClient";
import { Repository } from "../../types";
import { FC } from "react";
import { RepositorySearchPagePure } from "./RepositorySearchPage.pure";
import { useRepositorySearchProps } from "./useRepositorySearchProps";

export interface RepositorySearchPageConnectedProps {
  searchClient: SearchClient<Repository>;
}

export const RepositorySearchPageConnected: FC<RepositorySearchPageConnectedProps> =
  ({ searchClient, ...rest }) => {
    const repositorySearch = useRepositorySearchProps(searchClient);

    return <RepositorySearchPagePure {...repositorySearch} {...rest} />;
  };
