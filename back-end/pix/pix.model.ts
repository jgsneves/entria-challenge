import mongoose from "../services/mongo-db-service/mongo-db.service";
import { pixSchema } from "./pix.schema";

export abstract class Pix {
  datetime: string;
  debitParty: string;
  creditParty: string;
  value: number;
}

export const PixModel = mongoose.model<Pix>("Pix", pixSchema);
