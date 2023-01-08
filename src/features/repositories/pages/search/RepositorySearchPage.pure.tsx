import { PromiseState } from "../../../../common/state/usePromiseState";
import { Repository } from "../../types";
import React, { FC } from "react";
import { RepositorySearchPageLayout } from "./RepositorySearchPage.layout";
import { Alert, AlertIcon, Center, Spinner } from "@chakra-ui/react";
import { SearchBox } from "../../components/SearchBox";
import { RepositoriesList } from "../../components/RepositoriesList";
import { RepositoriesEmptyMessage } from "../../components/RepositoriesEmptyMessage";

export interface RepositorySearchPagePureProps {
  query: string;
  repositories: PromiseState<Repository[]>;
  onQueryChange: (query: string) => void;
}

export const RepositorySearchPagePure: FC<RepositorySearchPagePureProps> = ({
  repositories,
  query,
  onQueryChange,
}) => (
  <RepositorySearchPageLayout
    header={
      <SearchBox
        query={query}
        onSubmit={onQueryChange}
        searchStateType={repositories.type}
      />
    }
  >
    {repositories.type === "pending" && (
      <Center flex={1} height="100%">
        <Spinner size="xl" />
      </Center>
    )}
    {repositories.type === "error" && (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request: {repositories.message}
      </Alert>
    )}
    {repositories.type === "loaded" &&
      (repositories.data.length ? (
        <RepositoriesList repositories={repositories.data} />
      ) : (
        <RepositoriesEmptyMessage />
      ))}
  </RepositorySearchPageLayout>
);
