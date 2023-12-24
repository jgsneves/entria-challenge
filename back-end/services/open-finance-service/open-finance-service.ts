import { GetConditionDto } from "../../open-finance/dto/get-condition.dto";

interface Installment {
  amount: number;
  value: number;
  total: number;
}

interface Result {
  value: number;
  userId: string;
  installments: Installment[];
}

export class OpenFinanceService {
  public async getUserCreditCondition(dto: GetConditionDto): Promise<Result> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { creditValue, userId } = dto;

        const result: Result = {
          value: creditValue,
          userId,
          installments: [
            {
              amount: 2,
              value: parseFloat(((creditValue + 300) / 2).toFixed(2)),
              total: creditValue + 300,
            },
            {
              amount: 3,
              value: parseFloat(((creditValue + 400) / 3).toFixed(2)),
              total: creditValue + 400,
            },
            {
              amount: 4,
              value: parseFloat(((creditValue + 500) / 4).toFixed(2)),
              total: creditValue + 500,
            },
          ],
        };

        resolve(result);
      }, 3000);
    });
  }
}

export const openFinanceService = new OpenFinanceService();
