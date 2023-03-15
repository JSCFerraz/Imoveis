import { z } from "zod";
import {
  addressCreateSchema,
  addressReturnSchema,
  addressSchema,
} from "./address.schemas";
import { categoryReturnSchema } from "./category.schemas";

const realEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: addressSchema,
  categoryId: z.number(),
});

const realEstateCreateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: addressCreateSchema,
  sold: z.boolean().default(false),
});

const realEstateReturnSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: addressReturnSchema,
  sold: z.boolean().default(false),
  id: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: categoryReturnSchema,
});

const returnMultipleRealEstateSchema = realEstateReturnSchema.array();

export {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  returnMultipleRealEstateSchema,
};
