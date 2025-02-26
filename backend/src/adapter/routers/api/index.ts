import express from "express";

//imported api routers
import lessonRouter from "./lesson.routes";
import materialRouter from "./material.routes";
import courseRouter from "./course.routes";
import mentorRouter from "./mentor.routes";
import categoryRouter from "./category.routes";
import learnerRouter from "./learner.routes";
import authRouter from "./auth.routes";
import uploadRouter from "./upload.routes";
import notifyRouter from "./notification.routes";
import noAuthRouter from "./no-auth.routes";
import paymentRouter from "./payment.routes";
import profileRouter from "./profile.routes";
import purchaseHistoryRouter from "./purchase-history.routes";
import subscriptionHistoryRouter from "./subscription-history.routes";
import progressRouter from "./progress.routes";
import analysisRouter from "./analysis.routes";
import chatRouter from "./chat.routes";
import meetRouter from "./meet.routes";

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
apiRouter.use("/meets", meetRouter);

export default apiRouter;
