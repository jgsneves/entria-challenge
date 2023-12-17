import { Box, Flex } from "@chakra-ui/react";
import { WooviLogo } from "../WooviLogo";

export const Header = () => {
  return (
    <Box as="header" p={3}>
      <Flex
        mx="auto"
        maxWidth={1200}
        justifyContent="center"
        alignItems="center"
      >
        <WooviLogo color="green" />
      </Flex>
    </Box>
  );
};
