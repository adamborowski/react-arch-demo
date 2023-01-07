import { SearchClient } from "./SearchClient";
import { Adapter } from "./Adapter";
import { ZodError } from "zod";

export const createFetchSearchClient = <
  ServerType,
  ClientType,
  ServerPayloadType,
  CursorType
>(
  urlFactory: (query: string, cursor?: CursorType) => string,
  token: string,
  adapter: Adapter<ServerType, ClientType, ServerPayloadType>
): SearchClient<ClientType, CursorType> => ({
  search: async (query, abortController, cursor) => {
    const response = await fetch(urlFactory(query, cursor), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      signal: abortController?.signal,
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
