import { z } from "zod";
import { ChargeState } from "../charge.model";

export const updateChargeSchema = z.object({
  value: z.number().optional(),
  state: z.nativeEnum(ChargeState).optional(),
  installments: z.number().optional(),
});

export type UpdateChargeDto = z.infer<typeof updateChargeSchema>;
