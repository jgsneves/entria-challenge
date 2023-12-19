import { z } from "zod";

export const createChargeScheme = z.object({
  value: z.number(),
});

export type CreateChargeDto = z.infer<typeof createChargeScheme>;
