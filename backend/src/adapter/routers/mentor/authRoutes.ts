import express from "express";
import AuthControllers from "../../controllers/mentor/AuthControllers";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const authRouter = express.Router();

authRouter.post("/login", AuthControllers.mentorLogin);
authRouter.post("/logout", AuthControllers.mentorLogout);

authRouter.post("/signup", AuthControllers.mentorSignup);
authRouter.post("/google", AuthControllers.mentorGoogleSignup);
authRouter.post(
  "/resend",
  authenticateToken,
  authorizeRole(["mentor"]),
  AuthControllers.mentorResendOtp
);

authRouter.post(
  "/otp/verify",
  authenticateToken,
  authorizeRole(["mentor"]),
  AuthControllers.mentorOtpVerification
);

export default authRouter;
