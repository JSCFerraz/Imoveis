import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities";
import AppError from "../../errors/app.errors";

const verifyAddressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const { street, zipCode, number, city, state } = req.body.address;

  const findAddress = await addressRepository.findOne({
    where: {
      street: street,
      zipCode: zipCode,
      number: number ? number : "",
      city: city,
      state: state,
    },
  });

  if (findAddress) {
    throw new AppError("Address already exists", 409);
  }

  return next();
};

export default verifyAddressExistsMiddleware;
