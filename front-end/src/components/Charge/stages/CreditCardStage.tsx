import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Stepper } from "../../Stepper";
import { useUserData } from "../../../hooks/use-user-data";
import { CurrencyUtils } from "../../../utils/CurrencyUtils";
import { Field, Formik, FormikHelpers } from "formik";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import {
  PayWithCreditCardPayload,
  apiService,
} from "../../../services/api-service";
import { useMutation } from "react-relay";
import { changeChargeMutation } from "../graphql/mutations/changeCharge";
import { changeChargeMutation as ChangeChargeMutation } from "../graphql/mutations/__generated__/changeChargeMutation.graphql";
import { loggerService } from "../../../services/logger-service";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";

interface Props {
  creditInstallments: number;
  installmentValue: number;
  correlationId: string;
  totalValue: number;
  steps: string[];
  chargeId: string;
}

interface FormData extends PayWithCreditCardPayload {}

export const CreditCardStage = ({
  creditInstallments,
  installmentValue,
  totalValue,
  steps,
  correlationId,
  chargeId,
}: Props) => {
  const { name, authToken } = useUserData();
  const [commit] = useMutation<ChangeChargeMutation>(changeChargeMutation);
  const navigate = useNavigate();

  const formattedInstallmentValue =
    CurrencyUtils.formatCurrency(installmentValue);
  const formatedTotalValue = CurrencyUtils.formatCurrency(totalValue);

  const handleOnSubmit = (
    values: FormData,
    helpers: FormikHelpers<FormData>
  ) => {
    helpers.setSubmitting(true);

    apiService
      .payWithCreditCard(values, authToken)
      .then(() => {
        commit({
          variables: {
            id: chargeId,
            state: "PAID",
          },
          onCompleted: () => {
            //todo: change this to use graphql subscription
            navigate(0);
          },
          onError: (error) => {
            loggerService.log(error);
          },
        });
      })
      .finally(() => helpers.setSubmitting(false));
  };

  const formValidate = (data: FormData) => {
    const errors: Partial<FormData> = {};

    if (data.cpf === "" || !isValidCPF(data.cpf)) {
      errors.cpf = "Forneça um CPF válido";
    }

    if (data.name === "") {
      errors.name = "Um nome deve ser fornecido";
    }

    if (data.creditCardNumber === "") {
      errors.creditCardNumber = "Forneça um número de cartão de crédito";
    }

    if (data.creditCardExpiration === "") {
      errors.creditCardExpiration =
        "Forneça a validade do seu cartão de crédito";
    }

    if (data.cvv === "") {
      errors.cvv = "Forneça o CVV do seu cartão de crédito";
    }

    return errors;
  };

  return (
    <Flex flexDirection="column" alignItems="center" maxW={400} mx="auto">
      <Text as="b" textAlign="center" py={6} fontSize="large">
        {name}, pague o restante em {creditInstallments}x no cartão
      </Text>

      <Formik
        initialValues={{
          name: "",
          cpf: "",
          creditCardNumber: "",
          creditCardExpiration: "",
          cvv: "",
        }}
        onSubmit={(values, helpers) => handleOnSubmit(values, helpers)}
        validate={(data) => formValidate(data)}
      >
        {({ handleSubmit, errors, touched, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={!!errors.name && touched.name}>
              <FormLabel mr={0}>
                Nome completo
                <Field as={Input} id="name" name="name" />
              </FormLabel>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.cpf && touched.cpf}>
              <FormLabel mr={0}>
                CPF
                <Field as={Input} id="cpf" name="cpf" />
              </FormLabel>
              <FormErrorMessage>{errors.cpf}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.creditCardNumber && touched.creditCardNumber}
            >
              <FormLabel mr={0}>
                Número do cartão
                <Field
                  as={Input}
                  id="creditCardNumber"
                  name="creditCardNumber"
                />
              </FormLabel>
              <FormErrorMessage>{errors.creditCardNumber}</FormErrorMessage>
            </FormControl>

            <Flex justifyContent="space-between">
              <FormControl
                isInvalid={
                  !!errors.creditCardExpiration && touched.creditCardExpiration
                }
              >
                <FormLabel>
                  Vencimento
                  <Field
                    as={Input}
                    id="creditCardExpiration"
                    name="creditCardExpiration"
                  />
                </FormLabel>
                <FormErrorMessage>
                  {errors.creditCardExpiration}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.cvv && touched.cvv}>
                <FormLabel mr={0}>
                  CVV
                  <Field as={Input} id="cvv" name="cvv" />
                </FormLabel>
                <FormErrorMessage>{errors.cvv}</FormErrorMessage>
              </FormControl>
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
              mt={2}
              w="100%"
              size="sm"
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Continuar
            </Button>
          </form>
        )}
      </Formik>

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
