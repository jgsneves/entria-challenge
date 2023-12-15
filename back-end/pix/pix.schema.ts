import { Document, Schema } from "mongoose";
import { Pix } from "./pix.model";

export interface PixSchema extends Document, Pix {}

export const pixSchema = new Schema<PixSchema>({
  _id: String,
  datetime: Date,
  debitParty: String,
  creditParty: String,
  value: Number,
});
