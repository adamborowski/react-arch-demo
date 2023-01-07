import { Adapter } from "../../../../common/api/clients/Adapter";
import z from "zod";
import { Repository } from "../../types";

const searchRepositorySchema = z.object({
  databaseId: z.number(),
  name: z.string(),
  url: z.string(),
  stargazerCount: z.number(),
  forkCount: z.number(),
});

const searchPayloadSchema = z.object({
  data: z.object({
    search: z.object({
      nodes: z.array(searchRepositorySchema),
    }),
  }),
});

export const repositoryAdapter: Adapter<
  z.infer<typeof searchPayloadSchema>,
  Repository,
  never
> = {
  parse: searchPayloadSchema.parse,
  serverToClient: (serverResponse) =>
    serverResponse.data.search.nodes.map(
      ({ url, name, stargazerCount, forkCount, databaseId }) => ({
        id: databaseId,
        name,
        linkUrl: url,
        numForks: forkCount,
        numStars: stargazerCount,
      })
    ),
};
