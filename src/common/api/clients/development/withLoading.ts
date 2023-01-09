import { SearchClient } from "../SearchClient";

export const withLoading = <T>(): SearchClient<T> => ({
  search: () => new Promise<T[]>(() => void 0),
});
