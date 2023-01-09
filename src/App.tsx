import React from "react";
import "./App.css";
import { repositorySearchClient as graphqlClient } from "./features/repositories/api/github-graphql/repositorySearchClient";
import { RepositorySearchPageConnected } from "./features/repositories/pages/search/RepositorySearchPage.connected";
import { AppLayout } from "./features/repositories/components/AppLayout";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <ColorModeProvider>
        <AppLayout>
          <RepositorySearchPageConnected searchClient={graphqlClient} />
        </AppLayout>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
