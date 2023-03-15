import { Router } from "express";
import {
  createCategoryController,
  listAllCategoriesController,
  listCategoryRealEstatesController,
} from "../controllers/category.controller";
import verifyCategoryIdExistsMiddleware from "../middlewares/categories/verifyCategoryIdExists.middleware copy";
import verifyCategoryNameExistsMiddleware from "../middlewares/categories/verifyCategoryNameExists.middleware";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";
import verifyDataIsValidMiddleware from "../middlewares/verifyDataIsValid.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyToken.middleware";
import { categorySchema } from "../schemas/category.schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  verifyDataIsValidMiddleware(categorySchema),
  verifyTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  verifyCategoryNameExistsMiddleware,
  createCategoryController
);
categoriesRoutes.get("", listAllCategoriesController);
categoriesRoutes.get(
  "/:id/realEstate",
  verifyCategoryIdExistsMiddleware,
  listCategoryRealEstatesController
);

export default categoriesRoutes;
