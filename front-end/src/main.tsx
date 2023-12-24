import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { RelayEnvironmentProvider } from "react-relay";
import "@fontsource/nunito";
import environment from "./relay/environment.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const colors = {
  brand: {
    300: "#03D69D",
    100: "#F0FAF8",
  },
  primary: {
    300: "#003366",
    100: "#2c68a4",
  },
};

const fonts = {
  heading: `'Nunito', sans-serif`,
  body: `'Nunito', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ChakraProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode>
);
