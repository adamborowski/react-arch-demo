import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RepositorySearchPageConnected } from "./RepositorySearchPage.connected";
import { repositorySearchClient as graphqlClient } from "../../api/github-graphql/repositorySearchClient";
import { repositorySearchClient as restClient } from "../../api/github-rest/repositorySearchClient";
import { AppLayout } from "../../components/AppLayout";
import { useMemo } from "react";
import { withDelay } from "../../../../common/api/clients/development/withDelay";
import { withFailure } from "../../../../common/api/clients/development/withFailure";
import { withLoading } from "../../../../common/api/clients/development/withLoading";
import { Repository } from "../../types";
import { createInMemorySearchClient } from "../../../../common/api/clients/development/inMemorySearchClient";

export default {
  component: RepositorySearchPageConnected,
  decorators: [(fn) => <AppLayout>{fn()}</AppLayout>],
} satisfies ComponentMeta<typeof RepositorySearchPageConnected>;

const initialItems = [
  {
    id: 0,
    description: "desc0",
    owner: "owner0",
    name: "react0",
    numStars: 100,
    numForks: 200,
    linkUrl: "https://google.com",
  },
  {
    id: 1,
    description: "desc1",
    owner: "owner1",
    name: "react01",
    numStars: 101,
    numForks: 201,
    linkUrl: "https://google.com",
  },
  {
    id: 2,
    description: "desc2",
    owner: "owner2",
    name: "react012",
    numStars: 102,
    numForks: 202,
    linkUrl: "https://google.com",
  },
  {
    id: 3,
    description: "desc3",
    owner: "owner3",
    name: "react0123",
    numStars: 103,
    numForks: 203,
    linkUrl: "https://google.com",
  },
];

export const ClientInMemoryMock: ComponentStory<
  typeof RepositorySearchPageConnected
> = () => {
  const client = useMemo(
    () =>
      withDelay(
        createInMemorySearchClient<Repository, unknown>(
          initialItems,
          (query, item) =>
            item.name.toLowerCase().includes(query.trim().toLowerCase())
        ),
        1000
      ),
    []
  );

  return <RepositorySearchPageConnected searchClient={client} />;
};

export const ClientRest: ComponentStory<typeof RepositorySearchPageConnected> =
  () => <RepositorySearchPageConnected searchClient={restClient} />;

export const ClientGraphql: ComponentStory<
  typeof RepositorySearchPageConnected
> = () => <RepositorySearchPageConnected searchClient={graphqlClient} />;

export const ClientGraphqlDelayed: ComponentStory<
  typeof RepositorySearchPageConnected
> = () => {
  const client = useMemo(() => withDelay(graphqlClient, 5000), []);

  return <RepositorySearchPageConnected searchClient={client} />;
};

export const ClientGraphqlDelayedFailing: ComponentStory<
  typeof RepositorySearchPageConnected
> = () => {
  const client = useMemo(() => withFailure(withDelay(graphqlClient, 2000)), []);

  return <RepositorySearchPageConnected searchClient={client} />;
};

export const ClientGraphqlLoading: ComponentStory<
  typeof RepositorySearchPageConnected
> = () => {
  const client = useMemo(() => withLoading<Repository, unknown>(), []);

  return <RepositorySearchPageConnected searchClient={client} />;
};
