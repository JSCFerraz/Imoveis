import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  updateUserController,
} from "../controllers/user.controller";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";
import ensureUserIsAuthorizedMiddleware from "../middlewares/users/ensureUserIsAuthorized.middleware";
import verifyUserEmailExistsMiddleware from "../middlewares/users/verifyUserEmailExists.middleware";
import verifyUserIdExistsMiddleware from "../middlewares/users/verifyUserIdExists.middleware";
import verifyDataIsValidMiddleware from "../middlewares/verifyDataIsValid.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyToken.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  verifyDataIsValidMiddleware(userSchema),
  verifyUserEmailExistsMiddleware,
  createUserController
);

userRoutes.patch(
  "/:id",
  verifyUserIdExistsMiddleware,
  verifyDataIsValidMiddleware(userUpdateSchema),
  verifyTokenIsValidMiddleware,
  ensureUserIsAuthorizedMiddleware,
  verifyUserEmailExistsMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  verifyUserIdExistsMiddleware,
  verifyTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  deleteUserController
);

userRoutes.get(
  "",
  verifyTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listAllUsersController
);

export default userRoutes;
