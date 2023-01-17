export type PromiseState<DataType> =
  | { type: "pending" }
  | { type: "loaded"; data: DataType }
  | { type: "error"; message: string };

export type PromiseStateType = PromiseState<unknown>["type"];
