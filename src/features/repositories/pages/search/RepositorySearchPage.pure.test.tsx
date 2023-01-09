import { render, screen, within } from "@testing-library/react";
import { RepositorySearchPagePure } from "./RepositorySearchPage.pure";
import userEvent from "@testing-library/user-event";
import { renderOptions } from "./__test__/test-common";

describe("RepositorySearchPage.pure", () => {
  it("should render proper structure in loading mode", function () {
    render(
      <RepositorySearchPagePure
        query="test query"
        repositories={{ type: "pending" }}
        onQueryChange={jest.fn()}
      />,
      renderOptions
    );
    expect(screen.getByTestId("spinner")).toBeVisible();
  });

  it("should render proper structure in error mode", function () {
    render(
      <RepositorySearchPagePure
        query="test query"
        repositories={{ type: "error", message: "Test error" }}
        onQueryChange={jest.fn()}
      />,
      renderOptions
    );
    expect(screen.getByText(/Test error/)).toBeVisible();
  });

  it("should render proper structure in loaded mode, no results", function () {
    render(
      <RepositorySearchPagePure
        query="test query"
        repositories={{ type: "loaded", data: [] }}
        onQueryChange={jest.fn()}
      />,
      renderOptions
    );
    expect(screen.getByText("No repositories found")).toBeVisible();
  });

  it("should render proper structure in loaded mode, few results", function () {
    render(
      <RepositorySearchPagePure
        query="test query"
        repositories={{
          type: "loaded",
          data: [
            {
              id: 0,
              name: "Foo",
              description: "first repo",
              linkUrl: "https://google.com",
              owner: "Primo",
              numStars: 10,
              numForks: 100,
            },
            {
              id: 1,
              name: "Bar",
              description: "second repo",
              linkUrl: "https://google.com",
              owner: "Secondo",
              numStars: 20,
              numForks: 200,
            },
          ],
        }}
        onQueryChange={jest.fn()}
      />,
      renderOptions
    );

    const cardViews = screen.getAllByTestId("repository-card");

    const firstCardView = within(cardViews[0]);
    expect(firstCardView.getByText(/Foo/)).toBeVisible();
    expect(firstCardView.getByText("first repo")).toBeVisible();
    expect(firstCardView.getByText(/Primo/)).toBeVisible();
    expect(firstCardView.getByTitle("Stars and forks")).toHaveTextContent(
      "10100"
    );

    const secondCardView = within(cardViews[1]);
    expect(secondCardView.getByText(/Bar/)).toBeVisible();
    expect(secondCardView.getByText("second repo")).toBeVisible();
    expect(secondCardView.getByText(/Secondo/)).toBeVisible();
    expect(secondCardView.getByTitle("Stars and forks")).toHaveTextContent(
      "20200"
    );
  });

  it("should show provided query in the search box", () => {
    render(
      <RepositorySearchPagePure
        query="findme123"
        repositories={{ type: "pending" }}
        onQueryChange={jest.fn()}
      />,
      renderOptions
    );
    expect(screen.getByDisplayValue("findme123")).toBeVisible();
  });

  it("should allow to write query and click search", () => {
    const onSubmitMock = jest.fn();
    render(
      <RepositorySearchPagePure
        query="react"
        repositories={{ type: "pending" }}
        onQueryChange={onSubmitMock}
      />,
      renderOptions
    );
    userEvent.click(screen.getByDisplayValue("react"));
    userEvent.keyboard("ish");
    userEvent.click(screen.getByText("Search"));

    expect(onSubmitMock).toBeCalledWith("reactish");
  });

  it("should allow to click search where the query is unchanged and there is an error", () => {
    const onSubmitMock = jest.fn();
    render(
      <RepositorySearchPagePure
        query="react"
        repositories={{ type: "error", message: "try again" }}
        onQueryChange={onSubmitMock}
      />,
      renderOptions
    );
    userEvent.click(screen.getByText("Search"));

    expect(onSubmitMock).toBeCalledWith("react");
  });

  it("should forbit to click search where the query is unchanged and there no error", () => {
    const onSubmitMock = jest.fn();
    render(
      <RepositorySearchPagePure
        query="react"
        repositories={{ type: "loaded", data: [] }}
        onQueryChange={onSubmitMock}
      />,
      renderOptions
    );
    expect(screen.getByText("Search")).toBeDisabled();
    userEvent.click(screen.getByText("Search")); // click anyway
    expect(onSubmitMock).not.toBeCalled();
  });

});
