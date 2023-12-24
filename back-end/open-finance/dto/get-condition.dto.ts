import { z } from "zod";

export const getConditionDtoSchema = z.object({
  userId: z.string(),
  creditValue: z.number(),
});

export type GetConditionDto = z.infer<typeof getConditionDtoSchema>;
