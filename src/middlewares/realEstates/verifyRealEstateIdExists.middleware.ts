import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

import AppError from "../../errors/app.errors";

const verifyRealEstateIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateId: number = Number(req.params.id);

  const findRealEstateId: RealEstate | null =
    await realEstateRepository.findOne({
      where: {
        id: realEstateId,
      },
    });

  if (!findRealEstateId) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};

export default verifyRealEstateIdExistsMiddleware;
