import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listAllRealEstatesService = async (): Promise<Array<RealEstate>> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findAllRealEstates: Array<RealEstate> = await realEstateRepository.find(
    {
      relations: {
        address: true,
      },
    }
  );

  return findAllRealEstates;
};

export default listAllRealEstatesService;
