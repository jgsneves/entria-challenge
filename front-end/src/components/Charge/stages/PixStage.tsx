import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Stepper } from "../../Stepper";

export const PixStage = () => {
  return (
    <Flex flexDirection="column" alignItems="center" maxW={400} mx="auto">
      <Text as="b" textAlign="center" py={6}>
        João, pague a entrada de R$ 15.300,00 pelo Pix
      </Text>
      <Box
        w={258}
        h={258}
        border="1px solid"
        borderColor="brand.300"
        borderRadius="0.375rem"
      >
        QRCODE
      </Box>

      <Button
        backgroundColor="primary.300"
        color="white"
        _hover={{
          bgColor: "primary.100",
        }}
        width="fit-content"
        mt={5}
        onClick={() => {}}
      >
        Clique para copiar QR CODE
      </Button>

      <Text fontSize="medium" color="gray.300" mt={5}>
        Prazo de pagamento:
      </Text>
      <Text fontWeight={700} fontSize="medium">
        15/12/2021 - 08:17
      </Text>

      <Flex mt={5} w="100%" justifyContent="space-between">
        <Stepper index={1} steps={["1 entrada no Pix", "2 no cartão"]} />
        <Flex direction="column" justifyContent="space-between">
          <Text fontWeight={700}>R$ 15.300,00</Text>
          <Text fontWeight={700}>R$ 15.300,00</Text>
        </Flex>
      </Flex>

      <Divider my={5} />

      <Flex w="100%" justifyContent="space-between">
        <Text>CET: 0,5%</Text>
        <Text>Total: R$ 30.600,00</Text>
      </Flex>

      <Accordion allowToggle w="100%" mt={5}>
        <AccordionItem>
          <AccordionButton px={0} py={4}>
            <Text flex={1} textAlign="left">
              Como funciona?
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>conteúdo accordion</AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Text fontSize="medium" color="gray.300" mt={5}>
        Identificador:
      </Text>
      <Text fontWeight={700} fontSize="medium">
        9903fd8d-bc4a-4fa1-b21f-0919e2988f4c
      </Text>
    </Flex>
  );
};
