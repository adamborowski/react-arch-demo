// istanbul ignore file

import { SearchClient } from "./SearchClient";
import { Adapter } from "./Adapter";

export const createGraphqlSearchClient = <ServerType, ClientType>(
  base: string,
  token: string,
  queryBuilder: (query: string) => {
    query: string;
    variables: Record<string, string>;
  },
  adapter: Adapter<ServerType, ClientType>
): SearchClient<ClientType> => ({
  search: async (query, signal) => {
    const response = await fetch(base, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      signal,
      body: JSON.stringify(queryBuilder(query)),
    });
    const json = await response.json();
    const serverResponse = adapter.parse(json);
    return adapter.serverToClient(serverResponse);
  },
});
