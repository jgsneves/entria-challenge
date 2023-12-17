import { Box, Flex } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  selected: boolean;
}

export const Flag = ({ children, selected }: Props) => {
  return (
    <Flex
      gridColumn="1 / span 2"
      bgColor="primary.300"
      width="fit-content"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="sm"
      pl={2}
      py="2px"
    >
      {children}
      <Box
        w={0}
        h={0}
        borderTop="10px solid transparent"
        borderBottom="10px solid transparent"
        borderRight="20px solid"
        borderRightColor={selected ? "brand.100" : "white"}
        ml={2}
      />
    </Flex>
  );
};
