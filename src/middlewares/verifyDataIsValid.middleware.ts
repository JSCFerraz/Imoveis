import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import AppError from "../errors/app.errors";

const verifyDataIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const validated: Partial<Request> | undefined = schema.parse(req.body);
    req.body = validated;

    if (validated) {
      const validatedKeys: Array<string> = Object.keys(validated);
      if (!validatedKeys.length) {
        throw new AppError("One of the fields must be defined", 400);
      }
    }

    return next();
  };

export default verifyDataIsValidMiddleware;
