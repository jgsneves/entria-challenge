import { useState } from "react";
import { InitialStage } from "./stages/InitialStage";
import { PixStage } from "./stages/PixStage";
import { CreditCardStage } from "./stages/CreditCardStage";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import {
  ChargeByIdQuery,
  ChargeState,
} from "./__generated__/ChargeByIdQuery.graphql";
import { useParams } from "react-router-dom";
import { useCreditConditionQuery } from "../../hooks/use-credit-condition-query";
import { Loading } from "../Loading";

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

const buildStepString = (installments: number | null | undefined) => {
  const result: string[] = [];

  if (installments === 1 || !installments) {
    result.push("Pagamento no PIX");

    return result;
  }

  for (let index = 1; index <= installments; index++) {
    if (index === 1) {
      result.push(`${index}ª parcela no PIX`);
    } else {
      result.push(`${index}ª parcela no cartão`);
    }
  }

  return result;
};

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

  const steps = buildStepString(installments);

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

  const [currentStage] = useState<ChargeState>(state);

  const { data, isLoading } = useCreditConditionQuery(value);

  const handleOptionOnClick = (option: Option) => {
    setSelectedOption(option);
  };

  if (isLoading || !data) {
    return <Loading />;
  }

  if (!isLoading && !data) {
    return <h1>Não há informações sobre esta cobrança.</h1>;
  }

  const options: Option[] = data.installments.map((installment) => ({
    id: installment.total,
    payment: {
      amount: installment.amount,
      value: installment.value,
    },
    total: installment.total,
  }));

  if (currentStage === "PIX_PAYMENT") {
    const pixValue = valueWithCredit! / installments!;

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

  if (currentStage === "CREDIT_CARD_PAYMENT") {
    const installmentValue = valueWithCredit! / installments!;
    const creditInstallments = installments! - 1;

    return (
      <CreditCardStage
        creditInstallments={creditInstallments}
        installmentValue={installmentValue}
        steps={steps}
        totalValue={valueWithCredit!}
        correlationId={correlationId!}
      />
    );
  }

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
};
