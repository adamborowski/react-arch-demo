import { SearchClient } from "../SearchClient";

export const withFailure = <T, C>(
  client: SearchClient<T, C>,
  failOnEveryNRequest: number = 2
): SearchClient<T, C> => {
  let trialCounter = 0;
  return {
    search: async (query, cursor) => {
      trialCounter++;
      const result = await client.search(query, cursor);
      if (trialCounter % failOnEveryNRequest) {
        throw new Error(
          "Cannot get all. Fake error thrown randomly for testing purposes."
        );
      }
      return result;
    },
  };
};
