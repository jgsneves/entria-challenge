import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
