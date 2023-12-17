import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    300: "#03D69D",
    100: "#F0FAF8",
  },
  primary: "#003366",
};

const fonts = {
  heading: `'Nunito', sans-serif`,
  body: `'Nunito', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
