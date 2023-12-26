import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";

export const PaidStage = () => {
  return (
    <Flex
      direction="column"
      w="100%"
      h="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        w={200}
        justifyContent="center"
        alignItems="center"
        height={200}
        borderRadius="100%"
        border="1px solid"
        borderColor="gray.400"
        backgroundColor={"#03D69D"}
        _hover={{
          backgroundColor: "brand.300",
        }}
        aria-label="a"
      >
        <CheckIcon color="white" w={100} h={100} />
      </Flex>
      <Text as="b" textAlign="center" py={6} fontSize="large">
        Pagamento realizado com sucesso!
      </Text>
    </Flex>
  );
};
