export interface SearchClient<Entity, CursorType> {
  search: (
    query: string,
    abortController?: AbortController,
    beforeCursor?: CursorType
  ) => Promise<Entity[]>;
}
