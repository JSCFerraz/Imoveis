import { z } from "zod";
import { realEstateReturnSchema } from "./realEstate.schemas";

const categorySchema = z.object({
  name: z.string().min(3).max(45),
});

const categoryReturnSchema = categorySchema.extend({
  id: z.number(),
});

const realEstateWithoutAddressAndCategorySchema = realEstateReturnSchema.omit({
  address: true,
  category: true,
});

const returnMultipleCategoriesSchema = categoryReturnSchema.array();

const returnCategoryRealEstatesSchema = categoryReturnSchema.extend({
  realEstate: realEstateWithoutAddressAndCategorySchema.array().default([]),
});

export {
  categorySchema,
  categoryReturnSchema,
  returnMultipleCategoriesSchema,
  returnCategoryRealEstatesSchema,
};
