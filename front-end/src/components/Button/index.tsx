import React from "react";
import { Button as BaseButton, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

export const Button = (props: Props) => {
  const { children } = props;
  return (
    <BaseButton
      backgroundColor="primary.300"
      color="white"
      _hover={{
        bgColor: "primary.100",
      }}
      _disabled={{
        bgColor: "gray.300",
        cursor: "not-allowed",
      }}
      _loading={{
        bgColor: "gray.300",
        cursor: "not-allowed",
      }}
      mt={2}
      w="100%"
      onClick={() => {}}
      size="sm"
      {...props}
    >
      {children}
    </BaseButton>
  );
};
