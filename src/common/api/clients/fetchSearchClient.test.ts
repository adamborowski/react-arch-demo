import { createFetchSearchClient } from "./fetchSearchClient";
import z from "zod";
import { Adapter } from "./Adapter";

const createFetchMock = (data: unknown) =>
  jest.fn().mockResolvedValue({ json: jest.fn().mockReturnValue(data) });
const schema = z.array(z.object({ test: z.string() }));
type ServerSchema = z.infer<typeof schema>;

describe("fetchSearchClient", () => {
  it("should properly fetch and pass validation", async () => {
    const fetchMock = createFetchMock([{ test: "a" }, { test: "b" }]);
    const adapter: Adapter<ServerSchema, ServerSchema[number]> = {
      parse: schema.parse,
      serverToClient: (x) => x,
    };
    const client = createFetchSearchClient(
      (query) => `mock/${query}`,
      "token",
      adapter,
      fetchMock
    );

    const result = await client.search("givemerepo");

    expect(fetchMock).toBeCalledWith(
      "mock/givemerepo",
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer token" }),
      })
    );
    expect(result).toEqual([{ test: "a" }, { test: "b" }]);
  });

  it("should extract zod error", async () => {
    const fetchMock = createFetchMock([{ foo: "a" }, { test: 3 }]);
    const adapter: Adapter<ServerSchema, ServerSchema[number]> = {
      parse: schema.parse,
      serverToClient: (x) => x,
    };
    const client = createFetchSearchClient(
      (query) => `mock/${query}`,
      "token",
      adapter,
      fetchMock
    );

    await expect(client.search("givemerepo")).rejects.toThrowError(
      "0,test: Required\n1,test: Expected string, received number"
    );
  });

  it("should rethrow throw any other error other than zod", async () => {
    const fetchMock = createFetchMock([{ test: "a" }, { test: "b" }]);
    const adapter: Adapter<ServerSchema, ServerSchema[number]> = {
      parse: schema.parse,
      serverToClient: jest.fn().mockImplementation(() => {
        throw new Error("Try me");
      }),
    };
    const client = createFetchSearchClient(
      (query) => `mock/${query}`,
      "token",
      adapter,
      fetchMock
    );

    await expect(client.search("givemerepo")).rejects.toThrowError("Try me");
  });
});
