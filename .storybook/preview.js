import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { IntlProvider } from "react-intl";

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

//https://github.com/chakra-ui/chakra-ui/issues/6855

const ColorMode = ({ colorMode, children }) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(colorMode);
  }, [colorMode]);

  return children;
};

const withChakraProvider = (Story, context) => (
  <ChakraProvider>
    <ColorMode colorMode={context.globals.theme}>
      <Story />
    </ColorMode>
  </ChakraProvider>
);

const intlProvider = (Story) => (
  <IntlProvider locale="en">
    <Story />
  </IntlProvider>
);

export const decorators = [withChakraProvider, intlProvider];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: ["light", "dark"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};
