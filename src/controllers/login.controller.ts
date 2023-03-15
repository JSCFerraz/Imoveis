import { Request, Response } from "express";
import TUserLogin from "../interfaces/login.interface";
import createUserLoginService from "../services/login/createUserLogin.services";

const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userLogin: TUserLogin = req.body;

  const token: string = await createUserLoginService(userLogin);

  return res.json({ token: token });
};

export { userLoginController };
