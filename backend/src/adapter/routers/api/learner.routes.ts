import express from "express";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";
import LearnerController from "../../controllers/learner.controller";

//authController instance created.
//authRouter is created,

//----------------------admin authentication routes------------------------------//

/**
 * admin login route
 * endpoint - /admin/auth/login
 * method -  post
 * body - {email, password}
 * response - {success, message, data?}
 */

const learnerRouter = express.Router();
const learnerController = new LearnerController();

learnerRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.getAllLearners
);

learnerRouter.get(
  "/:learnerId",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.getLearner
);

learnerRouter.patch(
  "/:learnerId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.blockUnblockLearner
);

export default learnerRouter;
