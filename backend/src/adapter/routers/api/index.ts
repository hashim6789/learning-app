import express from "express";

//imported api routers
import lessonRouter from "./lessonRoutes";
import materialRouter from "./materialRoutes";
import courseRouter from "./courseRoutes";
import mentorRouter from "./mentorRoutes";
import categoryRouter from "./categoryRoutes";
import learnerRouter from "../learner";
import authRouter from "./authRoutes";
import uploadRouter from "./uploadRoutes";

const apiRouter = express.Router();

//redirect all lesson routes to corresponding subroutes
apiRouter.use("/auth", authRouter);
apiRouter.use("/lessons", lessonRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/materials", materialRouter);
apiRouter.use("/courses", courseRouter);
// apiRouter.use("/mentors", mentorRouter);
// apiRouter.use("/learners", learnerRouter);
apiRouter.use("/categories", categoryRouter);

export default apiRouter;
