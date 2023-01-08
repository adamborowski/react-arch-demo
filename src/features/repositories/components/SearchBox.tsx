import React, { FC, FormEvent, useLayoutEffect, useState } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";
import { PromiseStateType } from "../../../common/state/usePromiseState";

export interface SearchBoxProps {
  query: string;
  searchStateType: PromiseStateType;
  onSubmit: (query: string) => void;
}

export const SearchBox: FC<SearchBoxProps> = ({
  query,
  onSubmit,
  searchStateType,
  ...rest
}) => {
  const [currentQuery, setCurrentQuery] = useState(query);

  useLayoutEffect(() => {
    setCurrentQuery(query);
  }, [query]);

  const isSearchAvailable =
    searchStateType === "error" || currentQuery !== query;

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    isSearchAvailable && onSubmit(currentQuery);
  };

  return (
    <form onSubmit={handleSearch} {...rest}>
      <Flex
        position="sticky"
        top={0}
        padding={4}
        direction="row"
        gap={4}
        alignItems="start"
        background="chakra-subtle-bg"
      >
        <Input
          background="chakra-body-bg"
          id="query"
          value={currentQuery}
          maxWidth="xl"
          onChange={(event) => setCurrentQuery(event.target.value)}
        />
        <Button
          type="submit"
          variant="solid"
          colorScheme="blue"
          disabled={!isSearchAvailable}
        >
          Search
        </Button>
      </Flex>
    </form>
  );
};
