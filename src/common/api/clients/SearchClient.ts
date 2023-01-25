export interface SearchClient<Entity> {
  search: (query: string, signal?: AbortSignal) => Promise<Entity[]>;
}
