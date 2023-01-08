import { Repository } from "../types";
import { FC } from "react";
import { RepositoryCard } from "./RepositoryCard";
import styled from "@emotion/styled";

export interface RepositoriesListProps {
  repositories: Repository[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

export const RepositoriesList: FC<RepositoriesListProps> = ({
  repositories,
  ...rest
}) => (
  <Grid {...rest}>
    {repositories.map((repository) => (
      <RepositoryCard key={repository.id} repository={repository} />
    ))}
  </Grid>
);
