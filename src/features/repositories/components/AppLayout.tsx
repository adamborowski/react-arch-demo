import { FC, PropsWithChildren } from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { ColorModeChange } from "./ColorModeChange";

export const AppLayout: FC<PropsWithChildren> = ({ children, ...rest }) => (
  <Stack minHeight="100vh" spacing={0} {...rest}>
    <Flex
      direction="row"
      padding="4"
      alignItems="center"
      background="chakra-subtle-bg"
    >
      <Heading flex={1} size="md">
        Repositories Search Demo
      </Heading>
      <ColorModeChange />
    </Flex>
    {children}
  </Stack>
);
