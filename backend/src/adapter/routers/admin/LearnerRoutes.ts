import express from "express";
import LearnerController from "../../controllers/LearnerController.ts";
const learnerRouter = express.Router();

learnerRouter.get("/", LearnerController.getAllLearnersForAdmin);
learnerRouter.patch(
  "/:learnerId/block-unblock",
  LearnerController.blockUnblockLearner
);
// authRouter.post("/login", AuthControllers.learnerLogin);
// authRouter.post("/google", AuthControllers.learnerGoogleSignup);

export default learnerRouter;
