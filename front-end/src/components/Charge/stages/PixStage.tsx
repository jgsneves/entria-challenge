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
  useToast,
} from "@chakra-ui/react";
import { Stepper } from "../../Stepper";
import { useUserData } from "../../../hooks/use-user-data";
import { CurrencyUtils } from "../../../utils/CurrencyUtils";
import { useGetOnePixCharge } from "../../../hooks/use-get-one-pix-charge";
import { Loading } from "../../Loading";

interface Props {
  pixValue: number;
  installments: number;
  totalValue: number;
  steps: string[];
  pixChargeId: string;
}

export const PixStage = ({
  pixValue,
  installments,
  totalValue,
  steps,
  pixChargeId,
}: Props) => {
  const { name } = useUserData();
  const { data, isLoading } = useGetOnePixCharge(pixChargeId);
  const toast = useToast();

  if (isLoading || !data) {
    return <Loading />;
  }

  if (!isLoading && !data) {
    return <h1>Não há informações sobre esta cobrança PIX.</h1>;
  }
  const {
    charge: { qrCodeImage, brCode, expiresDate, correlationID },
  } = data;
  const helperText = installments === 1 ? "o valor" : "a entrada";
  const formattedPixValue = CurrencyUtils.formatCurrency(pixValue);
  const formmatedTotalValue = CurrencyUtils.formatCurrency(totalValue);

  const handleCopyQrCodeOnClick = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(brCode);

        toast({
          status: "success",
          description: "QR Code copiado com sucesso",
          duration: 5000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" maxW={400} mx="auto">
      <Text as="b" textAlign="center" py={6} fontSize="large">
        {name}, pague {helperText} de R$ {formattedPixValue} pelo Pix
      </Text>
      <Box
        w={258}
        h={258}
        border="1px solid"
        borderColor="brand.300"
        borderRadius="0.375rem"
      >
        <img src={qrCodeImage} alt="QR Code" />
      </Box>

      <Button
        backgroundColor="primary.300"
        color="white"
        _hover={{
          bgColor: "primary.100",
        }}
        width="fit-content"
        mt={5}
        onClick={handleCopyQrCodeOnClick}
        size="sm"
      >
        Clique para copiar QR CODE
      </Button>

      <Text fontSize="medium" color="gray.300" mt={5}>
        Prazo de pagamento:
      </Text>
      <Text fontWeight={700} fontSize="medium">
        {new Date(expiresDate).toLocaleString()}
      </Text>

      <Flex mt={5} w="100%" justifyContent="space-between">
        <Stepper index={0} steps={steps} />
        <Flex direction="column" justifyContent="space-between">
          {steps.map((installment) => (
            <Text key={installment} fontWeight={700}>
              R$ {formattedPixValue}
            </Text>
          ))}
        </Flex>
      </Flex>

      <Divider my={5} />

      <Flex w="100%" justifyContent="space-between">
        <Text>CET: 0,5%</Text>
        <Text>Total: R$ {formmatedTotalValue}</Text>
      </Flex>

      <Accordion allowToggle w="100%" mt={5}>
        <AccordionItem>
          <AccordionButton px={0} py={4}>
            <Text flex={1} textAlign="left" fontWeight={700}>
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
        {correlationID}
      </Text>
    </Flex>
  );
};
