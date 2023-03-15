import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";

const listSchedulesByRealEstateService = async (
  realEstateId: number
): Promise<RealEstate | null> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstateSchedules: RealEstate | null = await realEstateRepository
    .createQueryBuilder("real_estates")
    .select(["real_estates", "addresses", "categories", "schedules", "users"])
    .leftJoin("real_estates.address", "addresses")
    .leftJoin("real_estates.category", "categories")
    .leftJoin("real_estates.schedules", "schedules")
    .leftJoin("schedules.user", "users")
    .where("real_estates.id =  :realEstateId", {
      realEstateId: realEstateId,
    })
    .getOne();

  return findRealEstateSchedules;
};

export default listSchedulesByRealEstateService;
