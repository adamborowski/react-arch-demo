import { SearchClient } from "../SearchClient";
import { delay } from "../../../utils/delay";

export const withDelay = <T>(
  client: SearchClient<T>,
  delayMsc: number
): SearchClient<T> => ({
  search: async (query) => {
    const result = await client.search(query);
    await delay(delayMsc);
    return result;
  },
});
