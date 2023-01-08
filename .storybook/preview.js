import {ChakraProvider} from '@chakra-ui/react';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
};

const withChakraProvider = (Story) => {
  return (
    <ChakraProvider>
      <Story />
    </ChakraProvider>
  );
};

export const decorators = [withChakraProvider];
