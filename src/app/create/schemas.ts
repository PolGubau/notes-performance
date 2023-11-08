import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1).max(40),
  content: z.string().min(1).max(1200),
});
export type CreateTodoFields = z.infer<typeof createTodoSchema>;
