import { Body, JsonController, Post, UseBefore } from "routing-controllers";
import { openFinanceService } from "../services/open-finance-service/open-finance-service";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { GetConditionDto } from "./dto/get-condition.dto";

@JsonController("/open-finance")
@UseBefore(AuthMiddleware)
export class OpenFinanceController {
  @Post()
  public async getCondition(@Body() getConditionDto: GetConditionDto) {
    return await openFinanceService.getUserCreditCondition(getConditionDto);
  }
}
