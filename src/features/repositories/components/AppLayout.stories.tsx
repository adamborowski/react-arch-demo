import {ComponentMeta} from "@storybook/react";
import {Box, Card, CardHeader} from "@chakra-ui/react";
import {AppLayout} from "./AppLayout";

export default {
  component: AppLayout,
} satisfies ComponentMeta<typeof AppLayout>;

export const Default = () => (
  <AppLayout>
    <Box padding={3}>
      <Card padding={3}>
        <CardHeader>Some layout</CardHeader>
      </Card>
    </Box>
  </AppLayout>
);
