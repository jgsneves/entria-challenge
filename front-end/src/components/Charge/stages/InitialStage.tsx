import { Button, Flex, Text } from "@chakra-ui/react";
import { Payment } from "../../Payment";
import { PaymentType } from "../../Payment/PaymentType";
import { PaymentOption } from "../../PaymentOption";
import { Option } from "..";
import { Stage } from "../StageEnum";

interface Props {
  selectedPaymentOptionId: number;
  handleOptionOnClick: (id: number) => void;
  options: Option[];
  setCurrentStage: React.Dispatch<React.SetStateAction<Stage>>;
}

export const InitialStage = ({
  handleOptionOnClick,
  options,
  selectedPaymentOptionId,
  setCurrentStage,
}: Props) => {
  return (
    <Flex flexDirection="column">
      <Text as="b" textAlign="center" py={6} fontSize="large">
        João, como você quer pagar?
      </Text>
      <Payment type={PaymentType.PIX}>
        <PaymentOption
          amount={1}
          selected={selectedPaymentOptionId === 1}
          handleOptionOnClick={() => handleOptionOnClick(1)}
          value={30500}
          highlightText="Ganhe 3% de cashback"
          flag={
            <Text color="white" fontSize="smaller">
              <Text color="white" as="b">
                🤑 R$ 300
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
              selected={selectedPaymentOptionId === option.id}
              handleOptionOnClick={() => handleOptionOnClick(option.id)}
            />
          );
        })}
      </Payment>
      <Button
        backgroundColor="primary.300"
        color="white"
        _hover={{
          bgColor: "primary.100",
        }}
        mt={7}
        onClick={() => setCurrentStage(Stage.PIX)}
      >
        Continuar
      </Button>
    </Flex>
  );
};
