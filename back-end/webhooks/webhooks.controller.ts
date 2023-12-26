import {
  BadRequestError,
  Body,
  JsonController,
  Post,
} from "routing-controllers";
import { App } from "..";
import { chargeService } from "../charge/charge.service";
import { ChargeState } from "../charge/charge.model";

@JsonController("/webhooks")
export class WebhooksController {
  @Post("/receive-pix-charge")
  async openPixReceiveCharge(
    @Body() payload: { event: string; pixChargeId: string }
  ) {
    if (payload.event === "OPENPIX:CHARGE_COMPLETED") {
      const charge = await chargeService.updateChargeStateByPixChargeId(
        ChargeState.CREDIT_CARD_PAYMENT,
        payload.pixChargeId
      );

      const chargeObj = charge.toObject();

      App.ws.server?.clients.forEach((client) => {
        if (client.readyState === 1) {
          const message = {
            ...payload,
            chargeId: chargeObj._id,
          };
          client.send(JSON.stringify(message));
        }
      });

      return chargeObj;
    }

    return new BadRequestError();
  }
}
