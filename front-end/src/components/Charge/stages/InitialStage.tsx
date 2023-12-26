import { Button, Flex, Text } from "@chakra-ui/react";
import { Payment } from "../../Payment";
import { PaymentType } from "../../Payment/PaymentType";
import { PaymentOption } from "../../PaymentOption";
import { Option } from "..";
import { CurrencyUtils } from "../../../utils/CurrencyUtils";
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import { InitialStageMutation } from "./__generated__/InitialStageMutation.graphql";
import { loggerService } from "../../../services/logger-service";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../hooks/use-user-data";
import { openPixService } from "../../../services/open-pix-service";
import { v4 as uuid } from "uuid";

interface Props {
  chargeValue: number;
  chargeId: string;
  selectedOption: Option;
  oneInstallmentPaymentOption: Option;
  handleOptionOnClick: (option: Option) => void;
  options: Option[];
}

const changeChargeStateMutation = graphql`
  mutation InitialStageMutation(
    $state: ChargeState
    $installments: Float
    $id: String!
    $valueWithCredit: Float
    $pixChargeId: String
  ) {
    updateCharge(
      state: $state
      installments: $installments
      id: $id
      valueWithCredit: $valueWithCredit
      pixChargeId: $pixChargeId
    ) {
      _id
      installments
      state
      value
      correlationId
      valueWithCredit
      pixChargeId
    }
  }
`;

export const InitialStage = ({
  chargeValue,
  chargeId,
  handleOptionOnClick,
  options,
  selectedOption,
  oneInstallmentPaymentOption,
}: Props) => {
  const [commit, isInFlight] = useMutation<InitialStageMutation>(
    changeChargeStateMutation
  );
  const navigate = useNavigate();
  const { name } = useUserData();

  const handleContinueOnClick = async () => {
    const {
      charge: { identifier },
    } = await openPixService.createPixCharge({
      correlationID: uuid(),
      value: selectedOption.payment.value.toString().replace(".", ""),
    });

    commit({
      variables: {
        id: chargeId,
        state: "PIX_PAYMENT",
        installments: selectedOption.payment.amount,
        valueWithCredit: selectedOption.total,
        pixChargeId: identifier,
      },
      onCompleted: () => {
        //todo: change this to use graphql subscription
        navigate(0);
      },
      onError: (error) => {
        loggerService.log(error);
      },
    });
  };

  return (
    <Flex flexDirection="column">
      <Text as="b" textAlign="center" py={6} fontSize="large">
        {name}, como você quer pagar?
      </Text>
      <Payment type={PaymentType.PIX}>
        <PaymentOption
          amount={oneInstallmentPaymentOption.payment.amount}
          selected={selectedOption.id === oneInstallmentPaymentOption.id}
          handleOptionOnClick={() =>
            handleOptionOnClick(oneInstallmentPaymentOption)
          }
          value={oneInstallmentPaymentOption.payment.value}
          highlightText="Ganhe 3% de cashback"
          flag={
            <Text color="white" fontSize="smaller">
              <Text color="white" as="b">
                🤑 R$ {CurrencyUtils.formatCurrency(chargeValue * 0.03)}
              </Text>{" "}
              de volta no seu Pix na hora
            </Text>
          }
        />
      </Payment>

      {options.length > 0 && (
        <Payment type={PaymentType.DEFERRED}>
          {options.map((option) => {
            return (
              <PaymentOption
                key={option.id}
                amount={option.payment.amount}
                total={option.total}
                value={option.payment.value}
                selected={selectedOption.id === option.id}
                handleOptionOnClick={() => handleOptionOnClick(option)}
              />
            );
          })}
        </Payment>
      )}

      <Button
        backgroundColor="primary.300"
        color="white"
        _hover={{
          bgColor: "primary.100",
        }}
        _disabled={{
          bgColor: "gray.300",
        }}
        mt={7}
        onClick={handleContinueOnClick}
        disabled={isInFlight}
      >
        Continuar
      </Button>
    </Flex>
  );
};
