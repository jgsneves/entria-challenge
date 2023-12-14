import { z } from "zod";

export const createPixSchema = z.object({
  debitParty: z.string(),
  creditParty: z.string(),
  value: z.number(),
});
