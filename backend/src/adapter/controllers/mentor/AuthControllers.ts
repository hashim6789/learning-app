import { Request, Response, NextFunction } from "express";
import { SignupDTO } from "../../../shared/dtos/SignupDTO";
import MentorRepository from "../../../infrastructures/database/repositories/MentorRepository";
import GoogleSignupMentorUseCase from "../../../application/use_cases/mentor/GoogleSignupMentorUseCase";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import SignupMentorUseCase from "../../../application/use_cases/mentor/SignupMentorUseCase";
import LoginMentorUseCase from "../../../application/use_cases/mentor/MentorLoginUseCase";
import { Mentor } from "../../../application/entities/Mentor";

const mentorRepository = new MentorRepository();
const signupMentorUseCase = new SignupMentorUseCase(mentorRepository);
const loginMentorUseCase = new LoginMentorUseCase(mentorRepository);
const googleSignupMentorUseCase = new GoogleSignupMentorUseCase(
  mentorRepository
);

class AuthController {
  constructor() {}

  async mentorSignup(req: Request, res: Response, next: NextFunction) {
    const signupDTO: SignupDTO = req.body;
    try {
      const response = await signupMentorUseCase.execute(signupDTO);
      if (response.success && response.data) {
        const { accessToken, refreshToken } = response.data as {
          accessToken: string;
          refreshToken: string;
        };

        // Set refresh token as an HTTP-only cookie
        // setRefreshTokenCookie(refreshToken, res);
        // setRefreshTokenCookie(accessToken, res);

        // Send access token in response
        res.status(200).json({
          message: response.message,
          accessToken,
          refreshToken,
          user: "mentor",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async mentorLogin(req: Request, res: Response, next: NextFunction) {
    const loginDTO: LoginDTO = req.body;
    try {
      const response = await loginMentorUseCase.execute(loginDTO);
      if (response.success && response.data) {
        const { accessToken, refreshToken, mentor } = response.data as {
          accessToken: string;
          refreshToken: string;
          mentor: Mentor;
        };

        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("accessToken", accessToken, { httpOnly: false });

        // Send access token in response
        res.status(200).json({
          message: response.message,
          data: mentor,
          user: "mentor",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async mentorGoogleSignup(req: Request, res: Response, next: NextFunction) {
    const { token }: { token: string } = req.body;
    try {
      const response = await googleSignupMentorUseCase.execute(token);

      if (response.success && response.data) {
        const { accessToken, refreshToken } = response.data as {
          accessToken: string;
          refreshToken: string;
        };

        // Send access token in response
        res.status(200).json({
          message: response.message,
          accessToken,
          refreshToken,
          user: "mentor",
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
function setAccessTokenCookie(refreshToken: string, res: Response) {
  res.cookie("accessToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set true in production
    sameSite: "strict",
    maxAge: 7 * 60 * 1000, // 7 min
  });
}

export default new AuthController();
