import { SearchClient } from "../SearchClient";

export const withFailure = <T>(
  client: SearchClient<T>,
  failOnEveryNRequest: number = 2
): SearchClient<T> => {
  let trialCounter = -1;
  return {
    search: async (query) => {
      trialCounter++;
      const result = await client.search(query);
      if (trialCounter % failOnEveryNRequest === 0) {
        throw new Error(
          "Cannot get all. Fake error thrown randomly for testing purposes."
        );
      }
      return result;
    },
  };
};
