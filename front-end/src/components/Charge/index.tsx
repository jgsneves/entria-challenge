import { useState } from "react";
import { InitialStage } from "./stages/InitialStage";
import { PixStage } from "./stages/PixStage";
import { CreditCardStage } from "./stages/CreditCardStage";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { ChargeByIdQuery } from "./__generated__/ChargeByIdQuery.graphql";
import { useParams } from "react-router-dom";
import { useCreditConditionQuery } from "../../hooks/use-credit-condition-query";
import { Loading } from "../Loading";
import { buildStepString } from "./utils/buildStepString";
import { PaidStage } from "./stages/PaidStage";

interface OptionPayment {
  amount: number;
  value: number;
}

export interface Option {
  id: number;
  total: number;
  payment: OptionPayment;
}

const query = graphql`
  query ChargeByIdQuery($chargeId: String!) {
    getChargeById(id: $chargeId) {
      _id
      installments
      state
      value
      valueWithCredit
      pixChargeId
      correlationId
    }
  }
`;

export const Charge = () => {
  const { chargeId } = useParams();

  const {
    getChargeById: {
      state,
      value,
      _id: id,
      installments,
      valueWithCredit,
      pixChargeId,
      correlationId,
    },
  } = useLazyLoadQuery<ChargeByIdQuery>(query, {
    chargeId: chargeId!,
  });

  const oneInstallmentPaymentOption = {
    id: 0,
    payment: {
      amount: 1,
      value,
    },
    total: value,
  };

  const [selectedOption, setSelectedOption] = useState<Option>(
    oneInstallmentPaymentOption
  );

  const { data, isLoading } = useCreditConditionQuery(value, state);

  if (state === "PIX_PAYMENT") {
    const pixValue = valueWithCredit! / installments!;
    const steps = buildStepString(installments);

    return (
      <PixStage
        pixValue={pixValue}
        installments={installments!}
        steps={steps}
        totalValue={valueWithCredit!}
        pixChargeId={pixChargeId!}
      />
    );
  }

  if (state === "CREDIT_CARD_PAYMENT") {
    const installmentValue = valueWithCredit! / installments!;
    const creditInstallments = installments! - 1;
    const steps = buildStepString(installments);

    return (
      <CreditCardStage
        chargeId={id}
        creditInstallments={creditInstallments}
        installmentValue={installmentValue}
        steps={steps}
        totalValue={valueWithCredit!}
        correlationId={correlationId!}
      />
    );
  }

  if (state === "INITIAL") {
    if (isLoading || !data) {
      return <Loading />;
    }

    const handleOptionOnClick = (option: Option) => {
      setSelectedOption(option);
    };

    const options: Option[] = data.installments.map((installment) => ({
      id: installment.total,
      payment: {
        amount: installment.amount,
        value: installment.value,
      },
      total: installment.total,
    }));

    return (
      <InitialStage
        chargeValue={value}
        chargeId={id}
        handleOptionOnClick={handleOptionOnClick}
        options={options}
        selectedOption={selectedOption}
        oneInstallmentPaymentOption={oneInstallmentPaymentOption}
      />
    );
  }

  return <PaidStage />;
};
