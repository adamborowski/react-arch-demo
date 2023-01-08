import { Repository } from "../types";
import React, { FC } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import { ArrowUpIcon, StarIcon } from "@chakra-ui/icons";

export interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard: FC<RepositoryCardProps> = ({
  repository,
  ...rest
}) => (
  <Card {...rest}>
    <CardBody>
      <Stack mt="6" spacing="3">
        <Heading size="md">
          {repository.owner} &raquo; {repository.name}
        </Heading>
        <Text>{repository.description ?? <em>(no description)</em>}</Text>
        <Text
          color="blue.600"
          fontSize="2xl"
          display="flex"
          alignItems="center"
          gap="1"
          title="stars and forks"
        >
          <StarIcon boxSize="4" />
          {repository.numStars}
          <ArrowUpIcon boxSize="4" />
          {repository.numForks}
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing="2">
        <Button
          as="a"
          variant="solid"
          colorScheme="blue"
          href={repository.linkUrl}
          target="_blank"
        >
          View in GitHub
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
);
