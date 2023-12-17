import { useState } from "react";
import { InitialStage } from "./stages/InitialStage";
import { Stage } from "./StageEnum";
import { PixStage } from "./stages/PixStage";

interface OptionPayment {
  amount: number;
  value: number;
}

export interface Option {
  id: number;
  total: number;
  payment: OptionPayment;
}

export const Charge = () => {
  const [selectedPaymentOptionId, setSelectedPaymentOptionId] =
    useState<number>(1);
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.INITIAL);

  const options = [
    {
      id: 2,
      total: 30600,
      payment: {
        amount: 2,
        value: 15300,
      },
    },
    {
      id: 3,
      total: 30620,
      payment: {
        amount: 3,
        value: 10196.66,
      },
    },
    {
      id: 4,
      total: 30900,
      payment: {
        amount: 4,
        value: 7725.0,
      },
    },
  ];

  const handleOptionOnClick = (id: number) => {
    setSelectedPaymentOptionId(id);
  };

  if (currentStage === Stage.PIX) {
    return <PixStage />;
  }

  return (
    <InitialStage
      handleOptionOnClick={handleOptionOnClick}
      options={options}
      selectedPaymentOptionId={selectedPaymentOptionId}
      setCurrentStage={setCurrentStage}
    />
  );
};
