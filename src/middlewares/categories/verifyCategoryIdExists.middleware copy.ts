import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, User } from "../../entities";
import AppError from "../../errors/app.errors";

const verifyCategoryIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryId: number = Number(req.params.id);

  const findCategoryId: Category | null = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
  });

  if (!findCategoryId) {
    throw new AppError("Category not found", 404);
  }

  return next();
};

export default verifyCategoryIdExistsMiddleware;
