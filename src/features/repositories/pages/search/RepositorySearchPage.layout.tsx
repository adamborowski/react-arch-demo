import { FC, ReactNode } from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";

export interface RepositorySearchPageLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export const RepositorySearchPageLayout: FC<RepositorySearchPageLayoutProps> =
  ({ children, header }) => (
    <Flex flex={1} direction="column" alignItems="stretch">
      <Box position="sticky" top={0} zIndex={1} backdropFilter="blur(3px)">
        {header}
      </Box>
      <Stack flex="1">{children}</Stack>
    </Flex>
  );
