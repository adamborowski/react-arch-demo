import { FC } from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { messages } from "../../../i18n/messages";

export const ColorModeChange: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();
  return (
    <Button
      title={formatMessage(messages.changeTheme)}
      aria-label="change theme"
      onClick={toggleColorMode}
    >
      {colorMode === "dark" ? "🌒" : "🌖"}
    </Button>
  );
};
