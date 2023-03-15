import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/app.errors";

const ensureUserIsAuthorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = req.user.userId;
  const isAdmin: boolean = req.user.isAdmin;
  if (!isAdmin) {
    if (userId !== Number(req.params.id)) {
      throw new AppError("Insufficient permission", 403);
    }
  }
  return next();
};

export default ensureUserIsAuthorizedMiddleware;
