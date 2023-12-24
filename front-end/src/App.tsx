import { Box, Flex, Text } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Charge } from "./components/Charge";
import { WooviLogo } from "./components/WooviLogo";
import { useCookies } from "react-cookie";
import { AUTH_TOKEN_COOKIE } from "./constants/cookies";
import { Login } from "./components/Login";

function App() {
  const [cookies] = useCookies([AUTH_TOKEN_COOKIE]);

  if (!cookies[AUTH_TOKEN_COOKIE]) {
    return <Login />;
  }

  return (
    <Flex
      maxW={{ base: "90vw", xl: "1200px" }}
      mx="auto"
      flexDirection="column"
    >
      <Header />
      <Box as="main" minH="85vh">
        <Charge />
      </Box>
      <Flex as="footer" alignItems="center" mx="auto" py={5}>
        <Text textAlign="center" mr={2} color="gray.400" fontSize="smaller">
          Pagamento 100% seguro via:
        </Text>
        <WooviLogo color="gray" width="60" />
      </Flex>
    </Flex>
  );
}

export default App;
