import { inMemorySearchClient, renderOptions } from "./__test__/test-common";
import { act, render, screen, waitFor } from "@testing-library/react";
import { RepositorySearchPageConnected } from "./RepositorySearchPage.connected";
import userEvent from "@testing-library/user-event";
import { withFailure } from "../../../../common/api/clients/development/withFailure";

describe("RepositorySearchPage.connected", () => {
  it("should allow to search with query and re-search after changing the query", async () => {
    render(
      <RepositorySearchPageConnected searchClient={inMemorySearchClient} />,
      renderOptions
    );

    // loading initial search results
    expect(screen.getByTestId("spinner")).toBeVisible();
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // it should have all 4 repositories having 'react' in name
    expect(screen.getAllByTestId("repository-card")).toHaveLength(4);

    // change query to "12" and search
    userEvent.click(screen.getByDisplayValue("react"));
    userEvent.keyboard("{selectall}12");
    act(() => void userEvent.click(screen.getByText("Search")));

    // now search button should be disabled and we should wait for results
    expect(screen.getByText("Search")).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeVisible();
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // we should see only two repositories in results
    expect(screen.getAllByTestId("repository-card")).toHaveLength(2);

    // after successful search, change '12' to '123' in the query and try to search again
    userEvent.click(screen.getByDisplayValue("12"));
    userEvent.keyboard("3");
    act(() => void userEvent.click(screen.getByText("Search")));
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // now it should only show one repository
    expect(screen.getAllByTestId("repository-card")).toHaveLength(1);

    // if we don't change the query, clicking Search should do nothing
    userEvent.click(screen.getByText("Search"));
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  it("should allow to search with query and re-search in error state", async () => {
    render(
      <RepositorySearchPageConnected
        searchClient={withFailure(inMemorySearchClient, 1)}
      />,
      renderOptions
    );

    // loading initial search results
    expect(screen.getByTestId("spinner")).toBeVisible();
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // we should see an error page
    expect(screen.queryAllByTestId("repository-card")).toHaveLength(0);

    // since we have an error, just click search again, it should be enabled
    act(() => void userEvent.click(screen.getByText("Search")));

    // now search button should be disabled, and we should wait for results
    expect(screen.getByText("Search")).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeVisible();
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // we should see an error page again
    expect(screen.queryAllByTestId("repository-card")).toHaveLength(0);
  });

  it("should abort previous request when searching fast", async () => {
    const searchClient = { search: jest.fn() };
    render(
      <RepositorySearchPageConnected searchClient={searchClient} />,
      renderOptions
    );

    // we don't wait for results, we want to search again very soon
    // change query to "12" and search again
    userEvent.click(screen.getByDisplayValue("react"));
    userEvent.keyboard("{selectall}12");
    act(() => void userEvent.click(screen.getByText("Search")));

    expect(
      (searchClient.search.mock.calls[0][1] as AbortSignal).aborted
    ).toBeTruthy();
    expect(
      (searchClient.search.mock.calls[1][1] as AbortSignal).aborted
    ).toBeFalsy();
  });
});
