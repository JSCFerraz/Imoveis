import { z } from "zod";

const addressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const addressCreateSchema = addressSchema.extend({
  number: z.string().max(6).nullish().default(null),
});

const addressReturnSchema = addressSchema.extend({
  id: z.number(),
});

export { addressSchema, addressCreateSchema, addressReturnSchema };
