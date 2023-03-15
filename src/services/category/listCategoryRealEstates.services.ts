import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TAllCategoryRealEstatesReturn } from "../../interfaces/category.interface";
import { returnCategoryRealEstatesSchema } from "../../schemas/category.schemas";

const listCategoryRealEstatesService = async (
  categoryId: number
): Promise<TAllCategoryRealEstatesReturn> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findAllCategoryRealEstates: Category | null =
    await categoryRepository.findOne({
      where: {
        id: categoryId,
      },
      relations: {
        realEstate: true,
      },
    });

  const findAllCategoryRealEstatesReturn: TAllCategoryRealEstatesReturn =
    returnCategoryRealEstatesSchema.parse(findAllCategoryRealEstates);

  return findAllCategoryRealEstatesReturn;
};

export default listCategoryRealEstatesService;
