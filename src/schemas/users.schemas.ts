import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().min(4).max(20),
});

const userUpdateInputSchema = userSchema.omit({ admin: true });

const userReturnSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

const returnMultipleUserSchema = userReturnSchema.array();

const userUpdateSchema = userUpdateInputSchema.partial();

export {
  userSchema,
  userReturnSchema,
  returnMultipleUserSchema,
  userUpdateSchema,
};
