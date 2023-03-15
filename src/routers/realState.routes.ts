import { Router } from "express";
import {
  createRealEstateController,
  listAllRealEstateController,
} from "../controllers/realEstate.controller";
import verifyAddressExistsMiddleware from "../middlewares/addresses/verifyAddressExists.middleware";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";
import verifyDataIsValidMiddleware from "../middlewares/verifyDataIsValid.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyToken.middleware";
import { realEstateSchema } from "../schemas/realEstate.schemas";

const realStateRoutes: Router = Router();

realStateRoutes.post(
  "",
  verifyTokenIsValidMiddleware,
  verifyDataIsValidMiddleware(realEstateSchema),
  ensureUserIsAdminMiddleware,
  verifyAddressExistsMiddleware,
  createRealEstateController
);

realStateRoutes.get("", listAllRealEstateController);

export default realStateRoutes;
