import { Request, Response } from "express";
import { RealEstate } from "../entities";
import AppError from "../errors/app.errors";
import createScheduleService from "../services/schedule/createSchedule.services";
import listSchedulesByRealEstateService from "../services/schedule/listAllRealEstateSchedules.services";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const message: string = await createScheduleService(
    req.body,
    req.user.userId
  );

  return res.status(201).json({ message: message });
};

const listSchedulesByRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = Number(req.params.id);
  const allRealEstateSchedules: RealEstate | null =
    await listSchedulesByRealEstateService(realEstateId);
  return res.status(200).json(allRealEstateSchedules);
};

export { createScheduleController, listSchedulesByRealEstateController };
