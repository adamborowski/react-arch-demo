import { Adapter } from "../../../../common/api/clients/Adapter";
import z from "zod";
import { Repository } from "../../types";

const searchRepositorySchema = z.object({
  id: z.number(),
  full_name: z.string(),
  url: z.string(),
  stargazers_count: z.number(),
  forks_count: z.number(),
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
      ({ url, full_name, stargazers_count, forks_count, id }) => ({
        id,
        name: full_name,
        linkUrl: url,
        numForks: forks_count,
        numStars: stargazers_count,
      })
    ),
};
