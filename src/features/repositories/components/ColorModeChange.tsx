import { FC } from "react";
import { Button, useColorMode } from "@chakra-ui/react";

export const ColorModeChange: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      title="Change theme"
      aria-label="change theme"
      onClick={toggleColorMode}
    >
      {colorMode === "dark" ? "🌒" : "🌖"}
    </Button>
  );
};
