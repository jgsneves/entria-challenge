import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { CurrencyUtils } from "../../utils/CurrencyUtils";
import { Radio } from "./Radio";

interface Props {
  total?: number;
  amount: number;
  value: number;
  selected: boolean;
  flag?: React.ReactNode;
  highlightText?: string;
  handleOptionOnClick: () => void;
}

export const PaymentOption = ({
  amount,
  total,
  value,
  selected,
  flag,
  highlightText,
  handleOptionOnClick,
}: Props) => {
  return (
    <Flex
      as="label"
      cursor="pointer"
      onClick={handleOptionOnClick}
      bgColor={selected ? "brand.100" : "transparent"}
      border="1px solid"
      borderColor={selected ? "brand.300" : "gray.200"}
      sx={{
        "&:only-of-type": {
          borderRadius: "0.375rem",
        },
      }}
      _first={{
        borderRadius: "0.375rem 0.375rem 0px 0px",
        border: "1px solid",
        borderColor: selected ? "brand.300" : "gray.200",
      }}
      _last={{
        borderRadius: "0px 0px 0.375rem 0.375rem",
        border: "1px solid",
        borderColor: selected ? "brand.300" : "gray.200",
      }}
      _hover={{
        bgColor: "brand.100",
      }}
      p={3}
    >
      <Grid gridTemplateColumns="30px 90%" flex={1}>
        <Text as="b">{amount}x</Text>
        <Text>R$ {CurrencyUtils.formatCurrency(value)}</Text>
        {total && (
          <Text gridColumn="1 / span 2" fontSize="smaller" color="gray.400">
            Total: R$ {CurrencyUtils.formatCurrency(total)}
          </Text>
        )}
        <Text
          fontWeight="800"
          color="brand.300"
          fontSize="smaller"
          gridColumn="1 / span 2"
        >
          {highlightText}
        </Text>
        {flag && (
          <Box gridColumn="1 / span 2" bgColor="primary.300">
            {flag}
          </Box>
        )}
      </Grid>
      <Radio selected={selected} />
    </Flex>
  );
};
