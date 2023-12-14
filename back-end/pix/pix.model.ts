import mongoose from "../services/mongo-db-service/mongo-db.service";

const pixSchema = new mongoose.Schema({
  datetime: { type: String, required: true },
  debitParty: { type: String, required: true },
  creditParty: { type: String, required: true },
  value: { type: Number, required: true },
});

export const pixModel = mongoose.model("Pix", pixSchema);
export type PixSchema = typeof pixSchema;
