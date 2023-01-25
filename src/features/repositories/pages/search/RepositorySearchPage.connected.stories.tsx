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
import { screen, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { delay } from "../../../../common/utils/delay";

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

ClientInMemoryMock.play = async ({ canvasElement }) => {
  expect(screen.getByTestId("spinner")).toBeVisible();
  await waitFor(
    () => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument(),
    { timeout: 10000 }
  );
  expect(screen.getAllByTestId("repository-card")).toHaveLength(4);

  // change query to "angular" and search
  await userEvent.click(screen.getByDisplayValue("react"));
  await userEvent.keyboard("{selectall}12", { delay: 100 });
  await delay(300);
  await userEvent.click(screen.getByText("Search"));

  // now search button should be disabled and we should wait for results
  await waitFor(async () => {
    expect(screen.getByText("Search")).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeVisible();
  });

  await waitFor(
    () => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument(),
    { timeout: 10000 }
  );

  // we should see only two repositories in results
  expect(screen.getAllByTestId("repository-card")).toHaveLength(2);

  // change query to "reactandangularforevertogether" and search
  await userEvent.click(screen.getByDisplayValue("12"));
  await userEvent.keyboard("{selectall}reactandangularforevertogether", {
    delay: 100,
  });
  await delay(300);
  await userEvent.click(screen.getByText("Search"));

  // now search button should be disabled and we should wait for results
  await waitFor(async () => {
    expect(screen.getByText("Search")).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeVisible();
  });

  await waitFor(
    () => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument(),
    { timeout: 10000 }
  );

  expect(screen.queryAllByTestId("repository-card")).toHaveLength(0);
  expect(screen.getByText("No repositories found")).toBeVisible();
};

export const ClientRest: ComponentStory<
  typeof RepositorySearchPageConnected
> = () => <RepositorySearchPageConnected searchClient={restClient} />;

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
