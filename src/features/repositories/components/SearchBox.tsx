import React, { FC, FormEvent, useLayoutEffect, useState } from "react";
import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
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

  const bgColor = useColorModeValue(
    "rgba(237, 242, 247, 0.9)",
    "rgba(45, 55, 72, 0.9)"
  );
  const border = useColorModeValue(
    "1px solid var(--chakra-colors-chakra-border-color)",
    "1px solid var(--chakra-colors-chakra-body-bg)"
  );

  return (
    <form onSubmit={handleSearch} {...rest}>
      <Flex
        padding={4}
        direction="row"
        gap={4}
        alignItems="start"
        background={bgColor}
        borderBottom={border}
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
