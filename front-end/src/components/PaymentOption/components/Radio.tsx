import { IconButton } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface Props {
  selected: boolean;
}

export const Radio = ({ selected }: Props) => {
  return (
    <IconButton
      size="xs"
      borderRadius="100%"
      border="1px solid"
      borderColor="gray.400"
      backgroundColor={selected ? "#03D69D" : "transparent"}
      _hover={{
        backgroundColor: "brand.300",
      }}
      icon={selected ? <CheckIcon color="white" /> : undefined}
      aria-label="a"
    />
  );
};
