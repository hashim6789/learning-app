import express from "express";
import ProfileController from "../../controllers/profile.controller";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";

//profileController instance created.
const profileController = new ProfileController();

//profileRouter is created,
const profileRouter = express.Router();

//---------------------- profile routes------------------------------//

/**
 * mentor fetch profile route
 * endpoint - /mentor/categories
 * method -  get
 * body - {}
 * response - {success, message, data:categories}
 */
profileRouter.get(
  "/mentor",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.fetchProfileDetailsOfMentor
);

profileRouter.put(
  "/mentor/personal",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.updateProfileOfMentor
);
profileRouter.put(
  "/mentor/profile-img",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.updateProfileImageOfMentor
);
profileRouter.post(
  "/mentor/verify-password",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.verifyPasswordForMentor
);
profileRouter.post(
  "/mentor/change-password",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.changePasswordForMentor
);

profileRouter.get(
  "/learner",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  profileController.fetchProfileDetailsOfLearner
);

profileRouter.put(
  "/learner/personal",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  profileController.updateProfileOfLearner
);
profileRouter.put(
  "/learner/profile-img",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  profileController.updateProfileImageOfLearner
);
profileRouter.post(
  "/learner/verify-password",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  profileController.verifyPasswordForLearner
);
profileRouter.post(
  "/learner/change-password",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  profileController.changePasswordForLearner
);

export default profileRouter;
