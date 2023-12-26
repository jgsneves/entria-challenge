import { Body, JsonController, Post, UseBefore } from "routing-controllers";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

interface CreditCardData {
  name: string;
  cpf: string;
  creditCardNumber: string;
  creditCardExpiration: string;
  cvv: string;
}

@JsonController("/credit-card")
@UseBefore(AuthMiddleware)
export class CreditCardController {
  @Post()
  async pay(@Body() creditCardData: CreditCardData) {
    console.log({ creditCardData });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Done");
      }, 4000);
    });
  }
}
