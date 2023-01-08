import { useSearchRepositoriesClient } from "../../services/useSearchRepositoriesClient";
import { FC, useState } from "react";
import { PromiseState } from "../../../../common/state/usePromiseState";
import { Repository } from "../../types";
import { repositorySearchClient } from "./repositorySearchClient";
import { ComponentStory } from "@storybook/react";

export default {};

const Template: ComponentStory<FC<{ query: string }>> = ({ query }) => {
  const [state, setState] = useState<PromiseState<Repository[]>>({
    type: "pending",
  });
  useSearchRepositoriesClient(state, setState, repositorySearchClient, query);

  return (
    <div>
      {state.type === "pending" && "pending"}
      {state.type === "loaded" && (
        <pre>
          <code>{JSON.stringify(state.data, null, 2)}</code>
        </pre>
      )}
      {state.type === "error" && state.message}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  query: "react",
};
