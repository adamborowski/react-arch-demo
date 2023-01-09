import { withFailure } from "./withFailure";

describe("withFailure", () => {
  it("should failure every 3 request starting from first one", async () => {
    const client = { search: jest.fn().mockResolvedValue("Hey") };

    const failingClient = withFailure(client, 3);

    await expect(failingClient.search("")).rejects.toBeDefined();
    await expect(failingClient.search("")).resolves.toBeDefined();
    await expect(failingClient.search("")).resolves.toBeDefined();
    await expect(failingClient.search("")).rejects.toBeDefined();
    await expect(failingClient.search("")).resolves.toBeDefined();
    await expect(failingClient.search("")).resolves.toBeDefined();
  });
});
