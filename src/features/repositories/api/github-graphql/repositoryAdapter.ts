import { Adapter } from "../../../../common/api/clients/Adapter";
import z from "zod";
import { Repository, repositorySchema } from "../../types";
import { flattenZodError } from "../../../../common/services/flattenZodError";

const searchRepositorySchema = z.object({
  databaseId: z.number(),
  name: z.string(),
  url: z.string(),
  owner: z.object({ login: z.string() }),
  stargazerCount: z.number(),
  forkCount: z.number(),
  description: z.string().nullable(),
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
  Repository
> = {
  parse: flattenZodError(searchPayloadSchema.parse),
  serverToClient: (serverResponse) =>
    serverResponse.data.search.nodes.map(
      ({
        url,
        name,
        stargazerCount,
        forkCount,
        databaseId,
        owner,
        description,
      }) =>
        flattenZodError(repositorySchema.parse)({
          id: databaseId,
          name,
          owner: owner.login,
          linkUrl: url,
          numForks: forkCount,
          numStars: stargazerCount,
          description,
        })
    ),
};
