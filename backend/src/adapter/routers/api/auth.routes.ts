import express from "express";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";
import AuthController from "../../controllers/auth.controller";

//authController instance created.
const authController = new AuthController();

//authRouter is created,
const authRouter = express.Router();

//----------------------user authentication routes------------------------------//

/**
 * user login route
 * endpoint - /api/auth/login
 * method -  post
 * body - {email, password, role:User}
 * response - {success, message, data?}
 */
authRouter.post("/login", authController.login);

/**
 * user signup route
 * endpoint - /api/auth/signup
 * method -  post
 * body - {email, password, firstName, lastName?, role:User}
 * response - {success, message, data?}
 */
authRouter.post("/signup", authController.signup);

/**
 * user logout route
 * endpoint - /api/auth/logout
 * method -  post
 * body - {role:User}
 * response - {success, user, message, data?}
 */
authRouter.post(
  "/logout",
  authenticateToken,
  authorizeRole(["admin", "learner", "mentor"]),
  authController.logout
);

/**
 * user google login route
 * endpoint - /api/auth/google
 * method -  post
 * body - { token }
 * response - {success, message, data?}
 */
authRouter.post("/google", authController.googleSignup);

/**
 * user otp verify route
 * endpoint - /api/auth/otp/verify
 * method -  post
 * body - { otp }
 * response - {success, message}
 */
authRouter.post(
  "/otp/verify",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  authController.otpVerification
);

/**
 * user resend otp route
 * endpoint - /api/auth/resend
 * method -  post
 * body - {  }
 * response - {success, message}
 */
authRouter.post(
  "/resend",
  authenticateToken,
  authorizeRole(["learner", "mentor"]),
  authController.resendOtp
);

/**
 * user forgot password route
 * endpoint - /api/auth/forgot-password
 * method -  post
 * body - { email }
 * response - {success, message}
 */
authRouter.post("/forgot-password", authController.forgotPassword);

/**
 * user get change password route
 * endpoint - /api/auth/:token/change-password
 * method -  get
 * body - { }
 * params - { token }
 * response - {success, message}
 */
authRouter.get("/:token/change-password", authController.getChangePassword);

//   /**
//    * user change password route
//    * endpoint - /api/auth/:token/change-password
//    * method -  patch
//    * body - { }
//    * params - { token }
//    * response - {success, message}
//    */
authRouter.patch("/reset-password", authController.changePassword);

export default authRouter;
