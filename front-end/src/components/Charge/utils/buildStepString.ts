export const buildStepString = (installments: number | null | undefined) => {
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
