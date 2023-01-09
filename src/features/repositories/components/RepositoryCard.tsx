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
import { FormattedMessage, useIntl } from "react-intl";
import { messages } from "../../../i18n/messages";

export interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard: FC<RepositoryCardProps> = ({
  repository,
  ...rest
}) => {
  const { formatMessage } = useIntl();

  return (
    <Card {...rest} data-testid="repository-card">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">
            {repository.owner} &raquo; {repository.name}
          </Heading>
          <Text>{repository.description ?? <em>(no description)</em>}</Text>
          <Text
            color="blue.200"
            fontSize="2xl"
            display="flex"
            alignItems="center"
            gap="1"
            title={formatMessage(messages.statsTooltip)}
          >
            🌟
            {repository.numStars}
            🍴
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
            <FormattedMessage {...messages.viewInGithub} />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
