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
import { inMemorySearchClient } from "./__test__/test-common";

export default {
  component: RepositorySearchPageConnected,
  decorators: [(fn) => <AppLayout>{fn()}</AppLayout>],
} satisfies ComponentMeta<typeof RepositorySearchPageConnected>;
export const ClientInMemoryMock: ComponentStory<
  typeof RepositorySearchPageConnected
> = () => {
  const client = useMemo(() => withDelay(inMemorySearchClient, 1000), []);

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
  const client = useMemo(() => withLoading<Repository>(), []);

  return <RepositorySearchPageConnected searchClient={client} />;
};
