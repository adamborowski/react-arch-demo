import { renderOptions } from "./__test__/test-common";
import { act, render, screen, waitFor } from "@testing-library/react";
import { RepositorySearchPageConnected } from "./RepositorySearchPage.connected";
import userEvent from "@testing-library/user-event";

let originalFetch = global.fetch;
let mockedFetch: jest.Mock;
beforeAll(() => {
  mockedFetch = jest.fn();
  global.fetch = mockedFetch;
});
beforeEach(() => {
  mockedFetch?.mockClear();
});
afterAll(() => {
  global.fetch = originalFetch;
});

describe("RepositorySearchPage.connected", () => {
  it("should allow to search with query and re-search after changing the query", async () => {
    mockedFetch.mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: {
              search: {
                repositoryCount: 3614184,
                nodes: [
                  {
                    databaseId: 10270250,
                    name: "react",
                    owner: {
                      login: "facebook",
                    },
                    url: "https://github.com/facebook/react",
                    description:
                      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
                    stargazerCount: 200649,
                    forkCount: 41675,
                  },
                  {
                    databaseId: 105627846,
                    name: "reactos",
                    owner: {
                      login: "reactos",
                    },
                    url: "https://github.com/reactos/reactos",
                    description: "A free Windows-compatible Operating System",
                    stargazerCount: 11871,
                    forkCount: 1481,
                  },
                  {
                    databaseId: 49820627,
                    name: "react-native-svg",
                    owner: {
                      login: "software-mansion",
                    },
                    url: "https://github.com/software-mansion/react-native-svg",
                    description:
                      "SVG library for React Native, React Native Web, and plain React web projects.",
                    stargazerCount: 6533,
                    forkCount: 999,
                  },
                  {
                    databaseId: 32948863,
                    name: "awesome-react-native",
                    owner: {
                      login: "jondot",
                    },
                    url: "https://github.com/jondot/awesome-react-native",
                    description:
                      "Awesome React Native components, news, tools, and learning material!",
                    stargazerCount: 32371,
                    forkCount: 3951,
                  },
                ],
              },
            },
          }),
      })
    );
    render(<RepositorySearchPageConnected />, renderOptions);

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
  });
});
