import { FC, useCallback } from "react";
import { repositorySearchClient } from "./repositorySearchClient";
import { ComponentStory } from "@storybook/react";
import { useQuery } from "../../../../common/services/useQuery";

export default {
  parameters: {
    chromatic: { disable: true },
  },
};

const Template: ComponentStory<FC<{ query: string }>> = ({ query }) => {
  const getData = useCallback(
    (signal: AbortSignal) => repositorySearchClient.search(query, signal),
    [query]
  );
  const { state } = useQuery(getData);

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
