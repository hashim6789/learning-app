import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import LearnerController from "../../controllers/LearnerController.ts";
const learnerRouter = express.Router();

learnerRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  LearnerController.getAllLearnersForAdmin
);
learnerRouter.patch(
  "/:learnerId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  LearnerController.blockUnblockLearner
);
// authRouter.post("/login", AuthControllers.learnerLogin);
// authRouter.post("/google", AuthControllers.learnerGoogleSignup);

export default learnerRouter;
