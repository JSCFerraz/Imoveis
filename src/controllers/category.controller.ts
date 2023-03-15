import { Request, Response } from "express";
import {
  TAllCategoriesReturn,
  TAllCategoryRealEstatesReturn,
  TCategory,
  TCategoryReturn,
} from "../interfaces/category.interface";
import createCategoryService from "../services/category/createCategory.services";
import listAllCategoriesService from "../services/category/listAllCategories.services";
import listCategoryRealEstatesService from "../services/category/listCategoryRealEstates.services";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategory = req.body;
  const category: TCategoryReturn = await createCategoryService(categoryData);

  return res.status(201).json(category);
};

const listAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allCategories: TAllCategoriesReturn = await listAllCategoriesService();

  return res.status(200).json(allCategories);
};

const listCategoryRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = Number(req.params.id);
  const allCategoryRealEstates: TAllCategoryRealEstatesReturn | void =
    await listCategoryRealEstatesService(categoryId);

  return res.status(200).json(allCategoryRealEstates);
};

export {
  createCategoryController,
  listAllCategoriesController,
  listCategoryRealEstatesController,
};
