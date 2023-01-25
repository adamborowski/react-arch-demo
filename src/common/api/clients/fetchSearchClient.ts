import { SearchClient } from "./SearchClient";
import { Adapter } from "./Adapter";
import { ZodError } from "zod";

export const createFetchSearchClient = <ServerType, ClientType>(
  urlFactory: (query: string) => string,
  token: string,
  adapter: Adapter<ServerType, ClientType>,
  fetchImpl: typeof fetch = fetch
): SearchClient<ClientType> => ({
  search: async (query, signal) => {
    const response = await fetchImpl(urlFactory(query), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      signal,
    });
    const json = await response.json();

    try {
      const serverResponse = adapter.parse(json);
      return adapter.serverToClient(serverResponse);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new Error(
          e.issues.map((i) => `${i.path}: ${i.message}`).join("\n")
        );
      }
      throw e;
    }
  },
});
