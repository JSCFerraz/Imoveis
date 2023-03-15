import * as express from "express";
import { iUser } from "../../interfaces/users.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
        isAdmin: boolean;
      };
    }
  }
}
