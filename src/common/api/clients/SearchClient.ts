export interface SearchClient<Entity> {
  search: (
    query: string,
    abortController?: AbortController
  ) => Promise<Entity[]>;
}
