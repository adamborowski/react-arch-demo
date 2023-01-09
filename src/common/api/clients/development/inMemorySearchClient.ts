import { SearchClient } from "../SearchClient";

export const createInMemorySearchClient = <T>(
  initialItems: T[] = [],
  filterFunction: (query: string, item: T) => boolean
): SearchClient<T> => ({
  search: async (query) =>
    initialItems.filter((item) => filterFunction(query, item)),
});
