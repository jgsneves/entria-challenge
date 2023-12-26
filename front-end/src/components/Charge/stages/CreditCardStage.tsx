import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Divider,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Stepper } from "../../Stepper";
import { useUserData } from "../../../hooks/use-user-data";
import { CurrencyUtils } from "../../../utils/CurrencyUtils";

interface Props {
  creditInstallments: number;
  installmentValue: number;
  correlationId: string;
  totalValue: number;
  steps: string[];
}

export const CreditCardStage = ({
  creditInstallments,
  installmentValue,
  totalValue,
  steps,
  correlationId,
}: Props) => {
  const { name } = useUserData();

  const formattedInstallmentValue =
    CurrencyUtils.formatCurrency(installmentValue);
  const formatedTotalValue = CurrencyUtils.formatCurrency(totalValue);

  return (
    <Flex flexDirection="column" alignItems="center" maxW={400} mx="auto">
      <Text as="b" textAlign="center" py={6} fontSize="large">
        {name}, pague o restante em {creditInstallments}x no cartão
      </Text>

      <form>
        <FormLabel mr={0}>
          Nome completo
          <Input id="name" name="name" />
        </FormLabel>
        <FormLabel mr={0}>
          CPF
          <Input id="cpf" name="cpf" />
        </FormLabel>
        <FormLabel mr={0}>
          Número do cartão
          <Input id="creditCardNumber" name="creditCardNumber" />
        </FormLabel>

        <Flex wrap="wrap" justifyContent="space-between">
          <FormLabel maxW="48%" mr={0}>
            Vencimento
            <Input id="creditCardExpiration" name="creditCardExpiration" />
          </FormLabel>
          <FormLabel maxW="48%" mr={0}>
            CVV
            <Input id="cvv" name="cvv" />
          </FormLabel>
        </Flex>

        <FormLabel mr={0}>
          Parcelas
          <Select>
            <option>
              {creditInstallments}x de R$ {formattedInstallmentValue}
            </option>
          </Select>
        </FormLabel>

        <Button
          backgroundColor="primary.300"
          color="white"
          _hover={{
            bgColor: "primary.100",
          }}
          mt={2}
          w="100%"
          onClick={() => {}}
          size="sm"
        >
          Continuar
        </Button>
      </form>

      <Text fontSize="medium" color="gray.300" mt={5}>
        Prazo de pagamento:
      </Text>
      <Text fontWeight={700} fontSize="medium">
        {new Date().toLocaleString()}
      </Text>

      <Flex mt={5} w="100%" justifyContent="space-between">
        <Stepper index={1} steps={steps} />
        <Flex direction="column" justifyContent="space-between">
          {steps.map((installment) => (
            <Text key={installment} fontWeight={700}>
              R$ {formattedInstallmentValue}
            </Text>
          ))}
        </Flex>
      </Flex>

      <Divider my={5} />

      <Flex w="100%" justifyContent="space-between">
        <Text>CET: 0,5%</Text>
        <Text>Total: R$ {formatedTotalValue}</Text>
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
        {correlationId}
      </Text>
    </Flex>
  );
};
