import { z } from "zod";

export const editableTodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(40),
  content: z.string().min(1).max(1200),
});
export type EditableTodoFields = z.infer<typeof editableTodoSchema>;

// export const editableTodoSchema = z.object({
//   id: z.string().cuid(),
//   title: z.string().min(1).max(40),
//   content: z.string().min(1).max(1200),
//   creatorId: z.string().cuid(),
//   ownerId: z.string().cuid(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
//   completed: z.boolean(),
//   completedAt: z.date().nullable(),
//   status: z.number(),
//   permission: z.number(),
//   endAt: z.date().nullable(),
// });
