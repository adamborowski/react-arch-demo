import { render, screen } from "@testing-library/react";
import { AppLayout } from "./AppLayout";
import { IntlProvider } from "react-intl";

describe("AppLayout", () => {
  it("should render proper structure", () => {
    render(
      <AppLayout>
        <div>Foo</div>
      </AppLayout>,
      {
        wrapper: (props) => <IntlProvider locale="en" {...props} />,
      }
    );
    expect(screen.getByText("Repositories Search Demo")).toBeVisible();
    expect(screen.getByText("Foo")).toBeVisible();
    expect(screen.getByTitle("Change theme")).toBeVisible();
  });
});
