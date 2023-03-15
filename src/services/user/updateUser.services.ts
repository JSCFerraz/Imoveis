import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TUser, TUserReturn } from "../../interfaces/user.interface";
import { userReturnSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: TUser,
  userId: number
): Promise<TUserReturn> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const oldUser: User | null = await userRepo.findOneBy({
    id: userId,
  });

  const mergeUserData: TUser = { ...oldUser, ...userData };

  const updatedUser: TUser = userRepo.create(mergeUserData);

  await userRepo.save(updatedUser);

  const newUpdatedUser: TUserReturn = userReturnSchema.parse(updatedUser);

  return newUpdatedUser;
};

export default updateUserService;
