import { Adapter } from "../../../../common/api/clients/Adapter";
import z from "zod";
import { Repository } from "../../types";

const searchRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  owner: z.object({ login: z.string() }),
  url: z.string(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  description: z.string().nullable(),
});

const searchPayloadSchema = z.object({
  items: z.array(searchRepositorySchema),
});

export const repositoryAdapter: Adapter<
  z.infer<typeof searchPayloadSchema>,
  Repository,
  never
> = {
  parse: searchPayloadSchema.parse,
  serverToClient: (serverResponse) =>
    serverResponse.items.map(
      ({
        url,
        name,
        stargazers_count,
        forks_count,
        id,
        owner,
        description,
      }) => ({
        id,
        name,
        owner: owner.login,
        linkUrl: url,
        numForks: forks_count,
        numStars: stargazers_count,
        description,
      })
    ),
};
