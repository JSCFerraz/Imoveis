import { Router } from "express";
import { userLoginController } from "../controllers/login.controller";
import verifyDataIsValidMiddleware from "../middlewares/verifyDataIsValid.middleware";
import userLoginSchema from "../schemas/login.schemas";

const loginRoute: Router = Router();

loginRoute.post(
  "",
  verifyDataIsValidMiddleware(userLoginSchema),
  userLoginController
);

export default loginRoute;
