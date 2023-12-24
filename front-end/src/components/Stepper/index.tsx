import {
  Stepper as BaseStepper,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from "@chakra-ui/react";

interface Props {
  index: number;
  steps: string[];
}

export const Stepper = ({ index, steps }: Props) => {
  const { activeStep } = useSteps({
    index,
    count: steps.length,
  });
  return (
    <BaseStepper
      index={activeStep}
      orientation="vertical"
      colorScheme="green"
      height={`${35 * steps.length}px`}
      size="sm"
      gap="0"
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={<StepIcon />} />
          </StepIndicator>

          <StepTitle>{step}</StepTitle>

          <StepSeparator />
        </Step>
      ))}
    </BaseStepper>
  );
};
