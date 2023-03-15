import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import AppError from "../../errors/app.errors";
import { TSchedule } from "../../interfaces/schedule.interface";

const checkValidDayHour = (date: string, hour: string): string => {
  const dateParts: Array<string> = date.split("/");
  const year: number = parseInt(dateParts[0], 10);
  const day: number = parseInt(dateParts[1], 10);
  const month: number = parseInt(dateParts[2], 10);

  const scheduleDate: string = `${year}-${month}-${day}`;
  const scheduleIsoDate: string = `${scheduleDate}T${hour}`;
  const minHour: string = `${scheduleDate}T08:00`;
  const maxHour: string = `${scheduleDate}T18:00`;

  if (scheduleIsoDate < minHour || scheduleIsoDate > maxHour) {
    return "invalid-hour";
  }

  const newDate: string | number | Date = new Date(scheduleDate);

  if (newDate.getDay() === 0 || newDate.getDay() === 6) {
    return "invalid-day";
  }

  return "valid";
};

const createScheduleService = async (
  scheduleData: TSchedule,
  userId: number
): Promise<string> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const validDate: string = checkValidDayHour(
    scheduleData.date,
    scheduleData.hour
  );

  if (validDate === "invalid-day") {
    throw new AppError("Invalid date, work days are monday to friday");
  }
  if (validDate === "invalid-hour") {
    throw new AppError("Invalid hour, available times are 8AM to 18PM");
  }

  const findRealEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: scheduleData.realEstateId,
    },
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const findSchdules: Array<Schedule> | null = await scheduleRepository.find(
    {}
  );

  const findRealEstateSchedule: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.user", "users")
    .innerJoinAndSelect("schedules.realEstate", "real_estates")
    .where("schedules.date = :date", { date: scheduleData.date })
    .andWhere("schedules.hour = :hour", { hour: scheduleData.hour })
    .andWhere("schedules.realEstate = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .getOne();

  if (findRealEstateSchedule !== null) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const findUserSchedule: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.user", "users")
    .innerJoinAndSelect("schedules.realEstate", "real_estates")
    .where("schedules.date = :date", { date: scheduleData.date })
    .andWhere("schedules.hour = :hour", { hour: scheduleData.hour })
    .andWhere("schedules.user = :userId", {
      userId: userId,
    })
    .getOne();

  if (findUserSchedule !== null) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedule: Schedule = scheduleRepository.create({
    date: scheduleData.date,
    hour: scheduleData.hour,
    user: findUser!,
    realEstate: findRealEstate!,
  });

  await scheduleRepository.save(schedule);

  return "Schedule created";
};

export default createScheduleService;
