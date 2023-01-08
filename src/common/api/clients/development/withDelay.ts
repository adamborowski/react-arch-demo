import { SearchClient } from "../SearchClient";
import { delay } from "../../../utils/delay";

export const withDelay = <T, P>(
  client: SearchClient<T, P>,
  delayMsc: number
): SearchClient<T, P> => ({
  search: async (query, page) => {
    const result = await client.search(query, page);
    await delay(delayMsc);
    return result;
  },
});
