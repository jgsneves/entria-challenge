import { Document, Schema } from "mongoose";
import { Charge } from "./charge.model";

export interface ChargeSchema extends Document, Charge {}

export const chargeSchema = new Schema<ChargeSchema>({
  _id: String,
  value: Number,
  state: String,
  installments: Number,
  correlationId: Number,
  valueWithCredit: Number,
  pixChargeId: String,
});
