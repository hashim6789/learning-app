// import express from "express";
// import authenticateToken from "../../middleware/authenticateMiddlewares";
// import authorizeRole from "../../middleware/authorizationMiddlewares";
// import MentorAuthController from "../../controllers/MentorAuthController";

// //authController instance created.
// const authController = new MentorAuthController();

// //authRouter is created,
// const authRouter = express.Router();

// //----------------------mentor authentication routes------------------------------//

// /**
//  * mentor signup route
//  * endpoint - /mentor/auth/signup
//  * method -  post
//  * body - {firstName, lastName?, email, password}
//  * response - {success, message, data?}
//  */
// authRouter.post("/signup", authController.mentorSignup);

// /**
//  * mentor login route
//  * endpoint - /mentor/auth/login
//  * method -  post
//  * body - { email, password}
//  * response - {success, message, data?}
//  */
// authRouter.post(
//   "/login",
//   // checkBlocked,
//   authController.mentorLogin
// );

// /**
//  * mentor google login route
//  * endpoint - /mentor/auth/google
//  * method -  post
//  * body - { token }
//  * response - {success, message, data?}
//  */
// authRouter.post("/google", authController.mentorGoogleSignup);

// /**
//  * mentor logout route
//  * endpoint - /mentor/auth/logout
//  * method -  post
//  * body - {  }
//  * response - {success, message}
//  */
// authRouter.post(
//   "/logout",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   authController.mentorLogout
// );

// /**
//  * mentor otp verify route
//  * endpoint - /mentor/auth/otp/verify
//  * method -  post
//  * body - { otp }
//  * response - {success, message}
//  */
// authRouter.post(
//   "/otp/verify",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   authController.mentorOtpVerification
// );

// /**
//  * mentor resend otp route
//  * endpoint - /mentor/auth/resend
//  * method -  post
//  * body - {  }
//  * response - {success, message}
//  */
// authRouter.post(
//   "/resend",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   authController.mentorResendOtp
// );

// /**
//  * mentor forgot password route
//  * endpoint - /mentor/auth/forgot-password
//  * method -  post
//  * body - { email }
//  * response - {success, message}
//  */
// authRouter.post("/forgot-password", authController.forgotPasswordForMentor);

// /**
//  * mentor get change password route
//  * endpoint - /mentor/auth/:token/change-password
//  * method -  get
//  * body - { }
//  * params - { token }
//  * response - {success, message}
//  */
// authRouter.get(
//   "/:token/change-password",
//   authController.getChangePasswordMentor
// );

// /**
//  * mentor change password route
//  * endpoint - /mentor/auth/:token/change-password
//  * method -  patch
//  * body - { }
//  * params - { token }
//  * response - {success, message}
//  */
// authRouter.patch("/change-password", authController.changePasswordMentor);

// export default authRouter;
