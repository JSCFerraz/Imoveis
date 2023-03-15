import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/app.errors";

const verifyTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authToken: string | undefined = req.headers.authorization;
  if (!authToken) {
    throw new AppError("Missing bearer token", 401);
  }
  const token: string = authToken.split(" ")[1];

  verify(token, String(process.env.SECRET_KEY)!, (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    req.user = {
      userId: Number(decoded.sub),
      isAdmin: decoded.admin,
    };
  });

  return next();
};

export default verifyTokenIsValidMiddleware;
