import { FC, PropsWithChildren } from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { ColorModeChange } from "./ColorModeChange";
import { FormattedMessage } from "react-intl";
import { messages } from "../../../i18n/messages";

export const AppLayout: FC<PropsWithChildren> = ({ children, ...rest }) => (
  <Stack minHeight="100vh" spacing={0} {...rest}>
    <Flex
      direction="row"
      padding="4"
      alignItems="center"
      background="chakra-subtle-bg"
    >
      <Heading flex={1} size="md">
        <FormattedMessage {...messages.appTitle} />
      </Heading>
      <ColorModeChange />
    </Flex>
    Balbabla
    {children}
  </Stack>
);
