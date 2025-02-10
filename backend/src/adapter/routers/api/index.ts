import express from "express";

//imported api routers
import lessonRouter from "./lessonRoutes";
import materialRouter from "./materialRoutes";
import courseRouter from "./courseRoutes";
import mentorRouter from "./mentorRoutes";

const apiRouter = express.Router();

//redirect all lesson routes to corresponding subroutes
apiRouter.use("/lessons", lessonRouter);
apiRouter.use("/materials", materialRouter);
apiRouter.use("/courses", courseRouter);
apiRouter.use("/mentors", mentorRouter);

export default apiRouter;
