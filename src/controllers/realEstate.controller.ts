import { Request, Response } from "express";
import { RealEstate } from "../entities";
import { TRealEstate } from "../interfaces/realEstate.interface";
import createRealEstateService from "../services/realEstate/createRealEstate.services";
import listAllRealEstatesService from "../services/realEstate/listAllRealEstates.services";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: TRealEstate = req.body;
  const realEstate: RealEstate = await createRealEstateService(realEstateData);

  return res.status(201).json(realEstate);
};

const listAllRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allRealEstates: Array<RealEstate> = await listAllRealEstatesService();

  return res.status(200).json(allRealEstates);
};

export { createRealEstateController, listAllRealEstateController };
