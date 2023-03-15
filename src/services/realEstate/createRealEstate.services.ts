import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import AppError from "../../errors/app.errors";
import { TAddressReturn } from "../../interfaces/address.interface";
import { TRealEstate } from "../../interfaces/realEstate.interface";
import { addressReturnSchema } from "../../schemas/address.schemas";

const createRealEstateService = async (
  realEstateData: TRealEstate
): Promise<RealEstate> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findCategory = await categoryRepository.findOne({
    where: {
      id: realEstateData.categoryId,
    },
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  realEstateData.address.number === undefined
    ? (realEstateData.address.number = "")
    : realEstateData.address.number;

  const address: Address = addressRepository.create({
    ...realEstateData.address,
  });

  await addressRepository.save(address);
  const newAddress: TAddressReturn = addressReturnSchema.parse(address);

  const realEstate: RealEstate = realEstateRepository.create({
    value: realEstateData.value,
    size: realEstateData.size,
    sold: false,
    category: findCategory!,
    address: newAddress!,
  });

  await realEstateRepository.save(realEstate);

  return realEstate;
};

export default createRealEstateService;
