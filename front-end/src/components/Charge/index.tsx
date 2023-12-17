import { Flex, Text } from "@chakra-ui/react";
import { Payment } from "../Payment";
import { PaymentType } from "../Payment/PaymentType";
import { PaymentOption } from "../PaymentOption";
import { useState } from "react";

export const Charge = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<number>(1);

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
    setSelectedOptionId(id);
  };

  return (
    <Flex flexDirection="column">
      <Text as="b" textAlign="center" py={6}>
        João, como você quer pagar?
      </Text>
      <Payment type={PaymentType.PIX}>
        <PaymentOption
          amount={1}
          selected={selectedOptionId === 1}
          handleOptionOnClick={() => handleOptionOnClick(1)}
          value={30500}
          highlightText="Ganhe 3% de cashback"
          flag={
            <Text color="white" px={2} py={1} fontSize="smaller">
              <Text color="white" as="b">
                R$ 300
              </Text>{" "}
              de volta no seu Pix na hora
            </Text>
          }
        />
      </Payment>
      <Payment type={PaymentType.DEFERRED}>
        {options.map((option) => {
          return (
            <PaymentOption
              key={option.id}
              amount={option.payment.amount}
              total={option.total}
              value={option.payment.value}
              selected={selectedOptionId === option.id}
              handleOptionOnClick={() => handleOptionOnClick(option.id)}
            />
          );
        })}
      </Payment>
    </Flex>
  );
};
