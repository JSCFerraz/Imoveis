import { Repository } from "typeorm";
import { z } from "zod";
import { RealEstate } from "../entities";
import {
  realEstateCreateSchema,
  realEstateSchema,
  returnMultipleRealEstateSchema,
  realEstateReturnSchema,
} from "../schemas/realEstate.schemas";

type TRealEstate = z.infer<typeof realEstateSchema>;
type TRealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type TRealEstateReturn = z.infer<typeof realEstateReturnSchema>;
type TRealEstateRepo = Repository<RealEstate>;
type TAllRealEstatesReturn = z.infer<typeof returnMultipleRealEstateSchema>;

export {
  TRealEstate,
  TRealEstateReturn,
  TRealEstateRepo,
  TAllRealEstatesReturn,
  TRealEstateCreate,
};
