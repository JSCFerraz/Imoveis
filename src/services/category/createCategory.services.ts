import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  TCategory,
  TCategoryReturn,
} from "../../interfaces/category.interface";
import { categoryReturnSchema } from "../../schemas/category.schemas";

const createCategoryService = async (
  userData: TCategory
): Promise<TCategoryReturn> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const category = categoryRepository.create(userData);

  await categoryRepository.save(category);

  const newCategory: TCategoryReturn = categoryReturnSchema.parse(category);

  return newCategory;
};

export default createCategoryService;
