import { Flex, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Flex w="100%" h="80vh" justifyContent="center" alignItems="center">
      <Spinner color="brand.300" size="xl" />
    </Flex>
  );
};
