import { useEffect, useRef, useState } from "react";

export type PromiseState<DataType> =
  | { type: "pending" }
  | { type: "loaded"; data: DataType }
  | { type: "error"; message: string };

export const usePromiseState = <DataType>(
  promise: Promise<DataType>
): PromiseState<DataType> => {
  const [promiseState, setPromiseState] = useState<PromiseState<DataType>>({
    type: "pending",
  });

  const lastPromise = useRef<Promise<unknown> | null>(null);
  lastPromise.current = promise;

  useEffect(() => {
    promise
      .then((data) => {
        if (lastPromise.current === promise) {
          setPromiseState({
            type: "loaded",
            data,
          });
        }
      })
      .catch((error) => {
        if (lastPromise.current === promise) {
          setPromiseState({
            type: "error",
            message: error instanceof Error ? error.message : String(error),
          });
        }
      });
  }, [promise]);

  return promiseState;
};
