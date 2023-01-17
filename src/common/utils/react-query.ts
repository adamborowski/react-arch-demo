import { PromiseState } from "../state/usePromiseState";

export const getPromiseStateFromQueryState = <T>(
  status: "idle" | "error" | "loading" | "success",
  error: unknown,
  data: undefined | T[]
): PromiseState<T[]> =>
  status === "idle" || status === "loading"
    ? { type: "pending" }
    : status === "error"
    ? { type: "error", message: String(error) }
    : { type: "loaded", data: data! };
