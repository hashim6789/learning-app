import express from "express";

//imported api routers
import lessonRouter from "./lessonRoutes";
import materialRouter from "./materialRoutes";
import courseRouter from "./courseRoutes";
import mentorRouter from "./mentorRoutes";
import categoryRouter from "./categoryRoutes";
import learnerRouter from "./learnerRoutes";
import authRouter from "./authRoutes";
import uploadRouter from "./uploadRoutes";
import notifyRouter from "./notificationRoutes";
import noAuthRouter from "./noAuthRoutes";
import paymentRouter from "./paymentRoutes";
import profileRouter from "./profileRoutes";
import purchaseHistoryRouter from "./purchaseHistoryRoutes";
import subscriptionHistoryRouter from "./subscriptionHistoryRoutes";
import progressRouter from "./progressRoutes";
import analysisRouter from "./analysisRoutes";
import chatRouter from "./chatRoutes";

const apiRouter = express.Router();

//redirect all lesson routes to corresponding subroutes
apiRouter.use("/auth", authRouter);
apiRouter.use("/lessons", lessonRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/materials", materialRouter);
apiRouter.use("/courses", courseRouter);
apiRouter.use("/mentors", mentorRouter);
apiRouter.use("/learners", learnerRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/notify", notifyRouter);
apiRouter.use("/no-auth", noAuthRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/purchase-history", purchaseHistoryRouter);
apiRouter.use("/subscription-history", subscriptionHistoryRouter);
apiRouter.use("/progress", progressRouter);
apiRouter.use("/analysis", analysisRouter);
apiRouter.use("/chats", chatRouter);

export default apiRouter;
