import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TUser, TUserReturn } from "../../interfaces/user.interface";
import { userReturnSchema } from "../../schemas/users.schemas";

const createUserService = async (userData: TUser): Promise<TUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: TUser = userRepository.create(userData);

  await userRepository.save(user);

  const newUser: TUserReturn = userReturnSchema.parse(user);

  return newUser;
};

export default createUserService;
