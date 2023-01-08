import { SearchClient } from "../SearchClient";

export const withLoading = <T, C>(): SearchClient<T, C> => ({
  search: () => new Promise<T[]>(() => void 0),
});
