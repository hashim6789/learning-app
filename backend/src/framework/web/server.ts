//inbuilt mode modules
import express, { Application, NextFunction } from "express";
import connectDB from "../db/setup";
import morgan from "morgan";
import dotenv from "dotenv";
import "reflect-metadata";

//cors setup
import corsConfig from "../../shared/configs/corsConfig";

//refresh router
import refreshTokenRouter from "../../adapter/routers/reFreshTokenRoutes";

//imported the module level routers
import learnerRouter from "../../adapter/routers/learner";
import adminRouter from "../../adapter/routers/admin";
import mentorRouter from "../../adapter/routers/mentor";

//imported the custom middlewares
import errorHandler from "../../adapter/middleware/errorHandler";

//tins is for getting the environment variables
dotenv.config();

//app initialization and middlewares implementations
const app: Application = express();

app.use(corsConfig);
app.use(express.json());
app.use(morgan("dev"));

//called router level middlewares
app.use("/learner", learnerRouter);
app.use("/admin", adminRouter);
app.use("/mentor", mentorRouter);

app.use("/refresh", refreshTokenRouter);

//error handling middlewares
app.use(errorHandler);

//invoked the database connection function
connectDB();

//server configurations
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
