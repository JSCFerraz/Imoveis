import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import "dotenv/config";
import { Repository } from "typeorm";
import AppError from "../../errors/app.errors";
import TUserLogin from "../../interfaces/login.interface";

const createUserLoginService = async (
  loginData: TUserLogin
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (user.deletedAt !== null) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: String(process.env.EXPIRES_IN!),
      subject: String(user.id),
    }
  );

  return token;
};

export default createUserLoginService;
