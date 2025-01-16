import express from "express";
import AuthControllers from "../../controllers/learner/AuthControllers";

const authRouter = express.Router();

authRouter.post("/signup", AuthControllers.learnerSignup);
authRouter.post("/login", AuthControllers.learnerLogin);
authRouter.post("/google", AuthControllers.learnerGoogleSignup);

export default authRouter;
