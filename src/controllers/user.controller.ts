import { Request, Response } from "express";
import {
  TAllUsersReturn,
  TUser,
  TUserReturn,
} from "../interfaces/user.interface";
import createUserService from "../services/user/createUser.services";
import deleteUserService from "../services/user/deleteUser.services";
import listAllUsersService from "../services/user/listAllUsers.services";
import updateUserService from "../services/user/updateUser.services";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const UserData: TUser = req.body;
  const User: TUserReturn = await createUserService(UserData);

  return res.status(201).json(User);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsers: TAllUsersReturn = await listAllUsersService();

  return res.status(200).json(allUsers);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: TUserReturn = await updateUserService(
    req.body,
    Number(req.params.id)
  );
  return res.status(200).json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  await deleteUserService(userId);
  return res.status(204).json();
};

export {
  createUserController,
  listAllUsersController,
  updateUserController,
  deleteUserController,
};
