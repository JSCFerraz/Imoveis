import "express-async-errors";
import express, { Application } from "express";
import handleErrorMiddleware from "./middlewares/handleErrors.middleware";
import userRoutes from "./routers/users.routes";
import loginRoute from "./routers/login.routes";
import categoriesRoutes from "./routers/categories.routes";
import realStateRoutes from "./routers/realState.routes";
import schedulesRoutes from "./routers/schedules.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoute);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", realStateRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrorMiddleware);

export default app;
