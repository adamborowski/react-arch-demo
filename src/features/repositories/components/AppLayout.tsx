import { FC, PropsWithChildren } from "react";
import { Stack } from "@chakra-ui/react";

export const AppLayout: FC<PropsWithChildren> = (props) => (
  <Stack minHeight="100vh" {...props} />
);
