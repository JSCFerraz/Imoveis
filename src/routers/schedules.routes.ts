import { Router } from "express";
import {
  createScheduleController,
  listSchedulesByRealEstateController,
} from "../controllers/schedule.controller";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";
import verifyRealEstateIdExistsMiddleware from "../middlewares/realEstates/verifyRealEstateIdExists.middleware";
import ensureUserIsAuthorizedMiddleware from "../middlewares/users/ensureUserIsAuthorized.middleware";
import verifyDataIsValidMiddleware from "../middlewares/verifyDataIsValid.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyToken.middleware";
import { scheduleSchema } from "../schemas/schedules.schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  verifyTokenIsValidMiddleware,
  verifyDataIsValidMiddleware(scheduleSchema),
  createScheduleController
);

schedulesRoutes.get(
  "/realEstate/:id",
  verifyRealEstateIdExistsMiddleware,
  verifyTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listSchedulesByRealEstateController
);

export default schedulesRoutes;
