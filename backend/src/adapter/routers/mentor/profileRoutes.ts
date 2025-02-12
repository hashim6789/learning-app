import express from "express";
import ProfileController from "../../controllers/ProfileController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";

//profileController instance created.
const profileController = new ProfileController();

//profileRouter is created,
const profileRouter = express.Router();

//----------------------mentor profile routes------------------------------//

/**
 * mentor fetch profile route
 * endpoint - /mentor/categories
 * method -  get
 * body - {}
 * response - {success, message, data:categories}
 */
profileRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor", "learner"]),
  profileController.fetchProfileDetailsOfMentor
);

profileRouter.put(
  "/personal",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.updateProfileOfMentor
);
profileRouter.put(
  "/profile-img",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.updateProfileImageOfMentor
);
profileRouter.post(
  "/verify-password",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.verifyPasswordForMentor
);
profileRouter.post(
  "/change-password",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  profileController.changePasswordForMentor
);

// profileRouter.put(
//   "/",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor", "learner"]),
//   profileController.changePassword
// );

// profileRouter.post(
//   "/",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor", "learner"]),
//   profileController.createBankDetails
// );

export default profileRouter;
