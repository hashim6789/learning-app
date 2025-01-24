import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import LearnerAuthController from "../../controllers/LearnerAuthControllers";
import checkBlocked from "../../middleware/chackBlockMiddleware";

//authController instance created.
const authController = new LearnerAuthController();

//authRouter is created,
const authRouter = express.Router();

//----------------------learner authentication routes------------------------------//

/**
 * learner signup route
 * endpoint - /learner/auth/signup
 * method -  post
 * body - {firstName, lastName?, email, password}
 * response - {success, message, data?}
 */
authRouter.post("/signup", authController.learnerSignup);

/**
 * learner login route
 * endpoint - /learner/auth/login
 * method -  post
 * body - { email, password}
 * response - {success, message, data?}
 */
authRouter.post(
  "/login",
  // checkBlocked,
  authController.learnerLogin
);

/**
 * learner google login route
 * endpoint - /learner/auth/google
 * method -  post
 * body - { token }
 * response - {success, message, data?}
 */
authRouter.post("/google", authController.learnerGoogleSignup);

/**
 * learner logout route
 * endpoint - /learner/auth/logout
 * method -  post
 * body - {  }
 * response - {success, message}
 */
authRouter.post(
  "/logout",
  authenticateToken,
  authorizeRole(["learner"]),
  authController.learnerLogout
);

/**
 * learner otp verify route
 * endpoint - /learner/auth/otp/verify
 * method -  post
 * body - { otp }
 * response - {success, message}
 */
authRouter.post(
  "/otp/verify",
  authenticateToken,
  authorizeRole(["learner"]),
  authController.learnerOtpVerification
);

/**
 * learner resend otp route
 * endpoint - /learner/auth/resend
 * method -  post
 * body - {  }
 * response - {success, message}
 */
authRouter.post(
  "/resend",
  authenticateToken,
  authorizeRole(["learner"]),
  authController.learnerResendOtp
);

/**
 * learner forgot password route
 * endpoint - /learner/auth/forgot-password
 * method -  post
 * body - { email }
 * response - {success, message}
 */
authRouter.post("/forgot-password", authController.forgotPasswordForLearner);

/**
 * learner get change password route
 * endpoint - /learner/auth/:token/change-password
 * method -  get
 * body - { }
 * params - { token }
 * response - {success, message}
 */
authRouter.get(
  "/:token/change-password",
  authController.getChangePasswordLearner
);

/**
 * learner change password route
 * endpoint - /learner/auth/:token/change-password
 * method -  patch
 * body - { }
 * params - { token }
 * response - {success, message}
 */
authRouter.patch("/change-password", authController.changePasswordLearner);

export default authRouter;
