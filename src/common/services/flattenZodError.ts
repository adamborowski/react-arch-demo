import { ZodError } from "zod";

export const flattenZodError =
  <P extends unknown[], R>(originalFunction: (...args: P) => R) =>
  (...args: P) => {
    try {
      return originalFunction(...args);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new Error(
          e.issues.map((i) => `${i.path}: ${i.message}`).join("\n")
        );
      }
      throw e;
    }
  };
