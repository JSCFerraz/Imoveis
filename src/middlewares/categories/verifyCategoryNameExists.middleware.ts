import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, User } from "../../entities";
import AppError from "../../errors/app.errors";

const verifyCategoryNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  if (req.body.name) {
    const findCategoryName: Category | null = await categoryRepository.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (findCategoryName) {
      throw new AppError("Category already exists", 409);
    }
  }

  return next();
};

export default verifyCategoryNameExistsMiddleware;
