import { Box, Flex, Text } from "@chakra-ui/react";
import { WooviLogo } from "../WooviLogo";

export const Header = () => {
  return (
    <Box as="header" bgColor="brand.300">
      <Flex
        mx="auto"
        maxWidth={1200}
        justifyContent="space-between"
        alignItems="center"
      >
        <WooviLogo />
        <Text fontWeight="bold" color="white" fontSize="larger">
          Plataforma PIX
        </Text>
      </Flex>
    </Box>
  );
};
