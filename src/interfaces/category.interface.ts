import { z } from "zod";
import {
  categoryReturnSchema,
  categorySchema,
  returnCategoryRealEstatesSchema,
  returnMultipleCategoriesSchema,
} from "../schemas/category.schemas";

type TCategory = z.infer<typeof categorySchema>;
type TCategoryReturn = z.infer<typeof categoryReturnSchema>;
type TAllCategoriesReturn = z.infer<typeof returnMultipleCategoriesSchema>;
type TAllCategoryRealEstatesReturn = z.infer<
  typeof returnCategoryRealEstatesSchema
>;

export {
  TCategory,
  TCategoryReturn,
  TAllCategoriesReturn,
  TAllCategoryRealEstatesReturn,
};
