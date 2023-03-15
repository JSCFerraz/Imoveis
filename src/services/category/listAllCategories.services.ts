import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TAllCategoriesReturn } from "../../interfaces/category.interface";
import { returnMultipleCategoriesSchema } from "../../schemas/category.schemas";

const listAllCategoriesService = async (): Promise<TAllCategoriesReturn> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findAllCategories: Array<Category> = await categoryRepository.find({});

  const allCategories: TAllCategoriesReturn =
    returnMultipleCategoriesSchema.parse(findAllCategories);

  return allCategories;
};

export default listAllCategoriesService;
