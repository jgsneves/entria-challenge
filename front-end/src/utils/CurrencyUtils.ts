import { formatCurrency } from "@brazilian-utils/brazilian-utils";

export class CurrencyUtils {
  public static formatCurrency(value: number) {
    return formatCurrency(value);
  }
}
