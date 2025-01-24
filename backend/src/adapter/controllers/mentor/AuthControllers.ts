import { Request, Response, NextFunction } from "express";
import { SignupDTO } from "../../../shared/dtos/SignupDTO";
import MentorRepository from "../../../infrastructures/database/repositories/MentorRepository";
import GoogleSignupMentorUseCase from "../../../application/use_cases/mentor/GoogleSignupMentorUseCase";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import SignupMentorUseCase from "../../../application/use_cases/mentor/SignupMentorUseCase";
import LoginMentorUseCase from "../../../application/use_cases/mentor/MentorLoginUseCase";
import { Mentor } from "../../../application/entities/Mentor";
import MentorLogoutUseCase from "../../../application/use_cases/mentor/MentorLogoutUseCase";
import VerifyMentorUseCase from "../../../application/use_cases/mentor/VerifyMentorUseCase";
import ResendOtpMentorUseCase from "../../../application/use_cases/mentor/ResendOtpMentorUseCase";

const mentorRepository = new MentorRepository();
const signupMentorUseCase = new SignupMentorUseCase(mentorRepository);
const loginMentorUseCase = new LoginMentorUseCase(mentorRepository);
const googleSignupMentorUseCase = new GoogleSignupMentorUseCase(
  mentorRepository
);
const mentorLogoutUseCase = new MentorLogoutUseCase(mentorRepository);

const verifyMentorUseCase = new VerifyMentorUseCase(mentorRepository);
const resendOtpMentorUseCase = new ResendOtpMentorUseCase(mentorRepository);

class AuthController {
  constructor() {}

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
        res.cookie("user", "mentor", { httpOnly: true });

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

  async mentorLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const response = await mentorLogoutUseCase.execute(refreshToken);
      if (response.success && response.data) {
        const { mentor } = response.data as {
          mentor: Mentor;
        };

        res.cookie("refreshToken", "", { httpOnly: true });
        res.cookie("user", "", { httpOnly: true });
      }
      res.status(response.statusCode).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  }

  async mentorSignup(req: Request, res: Response, next: NextFunction) {
    const signupDTO: SignupDTO = req.body;
    try {
      const response = await signupMentorUseCase.execute(signupDTO);
      if (response.success && response.data) {
        const { accessToken, refreshToken, mentor } = response.data as {
          accessToken: string;
          refreshToken: string;
          mentor: Mentor;
        };

        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("accessToken", accessToken, { httpOnly: false });
        res.cookie("user", "mentor", { httpOnly: true });

        res.status(200).json({
          message: response.message,
          user: "mentor",
          data: mentor,
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
        const { accessToken, refreshToken, mentor } = response.data as {
          accessToken: string;
          refreshToken: string;
          mentor: Mentor;
        };

        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("accessToken", accessToken, { httpOnly: false });
        res.cookie("user", "mentor", { httpOnly: true });

        res.status(200).json({
          message: response.message,
          user: "mentor",
          data: mentor,
        });

        // Send access token in response
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async mentorOtpVerification(req: Request, res: Response, next: NextFunction) {
    const { otp }: { otp: string } = req.body;
    const mentorId = req.user?.userId || "";
    try {
      const response = await verifyMentorUseCase.execute(otp, mentorId);

      if (response.success && response.data) {
        const { mentor } = response.data as {
          mentor: Mentor;
        };

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
  async mentorResendOtp(req: Request, res: Response, next: NextFunction) {
    const mentorId = req.user?.userId || "";
    try {
      const response = await resendOtpMentorUseCase.execute(mentorId);

      if (response.success && response.data) {
        const { mentor } = response.data as {
          mentor: Mentor;
        };

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
}

export default new AuthController();
