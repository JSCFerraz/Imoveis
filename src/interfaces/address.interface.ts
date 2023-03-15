import { z } from "zod";
import {
  addressCreateSchema,
  addressReturnSchema,
  addressSchema,
} from "../schemas/address.schemas";

type TAddress = z.infer<typeof addressSchema>;
type TAddressCreate = z.infer<typeof addressCreateSchema>;
type TAddressReturn = z.infer<typeof addressReturnSchema>;

export { TAddress, TAddressReturn, TAddressCreate };
