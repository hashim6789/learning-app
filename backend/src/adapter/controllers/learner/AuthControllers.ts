import { Request, Response, NextFunction } from "express";
import LearnerRepository from "../../../infrastructures/database/repositories/LearnerRepository";
import { SignupDTO } from "../../../shared/dtos/SignupDTO";
import SignupLearnerUseCase from "../../../application/use_cases/learner/SignupLearneUseCase";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import LoginLearnerUseCase from "../../../application/use_cases/learner/LoginLearnerUseCase";
import GoogleSignupUseCase from "../../../application/use_cases/learner/GoogleSignupLearnerUseCase";

const learnerRepository = new LearnerRepository();
const signupLearnerUseCase = new SignupLearnerUseCase(learnerRepository);
const loginLearnerUseCase = new LoginLearnerUseCase(learnerRepository);
const googleSignupUseCase = new GoogleSignupUseCase(learnerRepository);

class AuthController {
  constructor() {}

  async learnerSignup(req: Request, res: Response, next: NextFunction) {
    const signupDTO: SignupDTO = req.body;
    try {
      const response = await signupLearnerUseCase.execute(signupDTO);
      if (response.success && response.data) {
        const { accessToken, refreshToken } = response.data as {
          accessToken: string;
          refreshToken: string;
        };

        res.status(200).json({
          message: response.message,
          accessToken,
          refreshToken,
          user: "learner",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async learnerLogin(req: Request, res: Response, next: NextFunction) {
    const loginDTO: LoginDTO = req.body;
    try {
      const response = await loginLearnerUseCase.execute(loginDTO);
      if (response.success && response.data) {
        const { accessToken, refreshToken } = response.data as {
          accessToken: string;
          refreshToken: string;
        };

        res.status(200).json({
          message: response.message,
          accessToken,
          refreshToken,
          user: "learner",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async learnerGoogleSignup(req: Request, res: Response, next: NextFunction) {
    const { token }: { token: string } = req.body;
    try {
      const response = await googleSignupUseCase.execute(token);

      if (response.success && response.data) {
        const { accessToken, refreshToken } = response.data as {
          accessToken: string;
          refreshToken: string;
        };

        res.status(200).json({
          message: response.message,
          accessToken,
          refreshToken,
          user: "learner",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

function setRefreshTokenCookie(refreshToken: string, res: Response) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set true in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export default new AuthController();
