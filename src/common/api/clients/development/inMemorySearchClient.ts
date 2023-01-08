import { SearchClient } from "../SearchClient";

export const createInMemorySearchClient = <T, S>(
  initialItems: T[] = [],
  filterFunction: (query: string, item: T) => boolean
): SearchClient<T, S> => ({
  search: async (query) =>
    initialItems.filter((item) => filterFunction(query, item)),
});
