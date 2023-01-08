import { Alert, AlertIcon } from "@chakra-ui/react";

export const RepositoriesEmptyMessage = () => (
  <Alert status="info">
    <AlertIcon />
    No repositories found
  </Alert>
);
