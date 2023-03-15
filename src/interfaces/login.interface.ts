import { z } from "zod";
import userLoginSchema from "../schemas/login.schemas";

type TUserLogin = z.infer<typeof userLoginSchema>;

export default TUserLogin;
