import express from "express";
import AuthControllers from "../../controllers/mentor/AuthControllers";

const authRouter = express.Router();

authRouter.post("/signup", AuthControllers.mentorSignup);
authRouter.post("/login", AuthControllers.mentorLogin);
authRouter.post("/google", AuthControllers.mentorGoogleSignup);

export default authRouter;
