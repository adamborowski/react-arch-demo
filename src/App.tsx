import React from "react";
import "./App.css";
import { AppLayout } from "./features/repositories/components/AppLayout";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { IntlProvider } from "react-intl";
import { RepositorySearchPageSimple } from "./features/repositories/pages/search/RepositorySearchPage.simple";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});

function App() {
  return (
    <IntlProvider
      locale={navigator.language}
      defaultLocale="en"
      onError={(err) => {
        if (err.code === "MISSING_TRANSLATION") {
          // console.warn("Missing translation", err.message);
          return;
        }
        throw err;
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ColorModeProvider>
            <AppLayout>
              <RepositorySearchPageSimple />
            </AppLayout>
          </ColorModeProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </IntlProvider>
  );
}

export default App;
