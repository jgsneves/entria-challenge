import mongoose from "../services/mongo-db-service/mongo-db.service";
import { chargeSchema } from "./charge.schema";

export enum ChargeState {
  INITIAL = "INITIAL",
  PIX_PAYMENT = "PIX_PAYMENT",
  CREDIT_CARD_PAYMENT = "CREDIT_CARD_PAYMENT",
  PAID = "PAID",
}

export abstract class Charge {
  value: number;
  state: ChargeState;
  installments: number | null;
}

export const ChargeModel = mongoose.model<Charge>("Charge", chargeSchema);
