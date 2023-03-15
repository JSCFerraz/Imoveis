import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/app.errors";

const verifyUserEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (req.body.email) {
    const findUserEmail: User | null = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (findUserEmail) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export default verifyUserEmailExistsMiddleware;
