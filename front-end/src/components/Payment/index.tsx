import { Card, Tag, Text } from "@chakra-ui/react";
import { PaymentType } from "./PaymentType";
import React from "react";

interface Props {
  type: PaymentType;
  children?: React.ReactNode;
}

export const Payment = ({ type, children }: Readonly<Props>) => {
  return (
    <Card variant="outline" position="relative" _last={{ marginTop: 7 }}>
      <Tag
        width="fit-content"
        px={5}
        bgColor="gray.300"
        borderRadius="2xl"
        position="absolute"
        top={-3}
        left={4}
      >
        <Text as="b" fontSize="smaller">
          {type === PaymentType.PIX ? "Pix" : "Pix Parcelado"}
        </Text>
      </Tag>
      {children}
    </Card>
  );
};
