import express from "express";

//imported learner routers
import authRouter from "./authRoutes";
import coursesRouter from "./coursesRouter";
import categoryRoutes from "./categoryRoutes";
import uploadRouter from "./uploadRoutes";
import lessonRouter from "./lessonsRoutes";
import materialRouter from "./materialRoutes";
import profileRouter from "./profileRoutes";

// import { authenticate } from "../../middleware/authMiddleware";

const mentorRouter = express.Router();

//redirect all learner routes to corresponding subroutes
mentorRouter.use("/auth", authRouter);
mentorRouter.use("/courses", coursesRouter);
mentorRouter.use("/categories", categoryRoutes);
mentorRouter.use("/upload", uploadRouter);
mentorRouter.use("/lessons", lessonRouter);
mentorRouter.use("/materials", materialRouter);
mentorRouter.use("/profile", profileRouter);

export default mentorRouter;
