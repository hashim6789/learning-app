import { Request, Response, NextFunction } from "express";

//imported dtos for check the body credentials
import { SignupDTO } from "../../shared/dtos/SignupDTO";
import { LoginDTO } from "../../shared/dtos/LoginDTO";
import { OtpDTO } from "../../shared/dtos/OtpDTO";

//imported the entities
import { Mentor } from "../../application/entities/Mentor";

//imported the repositories
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import OtpRepository from "../../infrastructures/database/repositories/OtpRepository";

//imported the use cases
import SignupMentorUseCase from "../../application/use_cases/mentor/SignupMentorUseCase";
import LoginMentorUseCase from "../../application/use_cases/mentor/LoginMentorUseCase";
// import GoogleSignupUseCase from "../../../application/use_cases/mentor/GoogleSignupMentorUseCase";
import LogoutMentorUseCase from "../../application/use_cases/mentor/LogoutMentorUseCase";
import GoogleSignupMentorUseCase from "../../application/use_cases/mentor/GoogleSignupMentorUseCase";
import VerifyMentorUseCase from "../../application/use_cases/mentor/VerifyMentorUseCase";
import ResendOtpMentorUseCase from "../../application/use_cases/mentor/ResendOtpMentorUseCase";
import ForgotPasswordMentorUseCase from "../../application/use_cases/mentor/ForgotPasswordMentorUseCase";
import GetChangePasswordMentorUseCase from "../../application/use_cases/mentor/GetChangePasswordMentorUseCase";
import ChangePasswordMentorUseCase from "../../application/use_cases/mentor/ChangePasswordMentorUseCase";

//created the instances
const mentorRepository = new MentorRepository();
const otpRepository = new OtpRepository();
const signupMentorUseCase = new SignupMentorUseCase(
  mentorRepository,
  otpRepository
);
const loginMentorUseCase = new LoginMentorUseCase(mentorRepository);
const googleSignupMentorUseCase = new GoogleSignupMentorUseCase(
  mentorRepository
);
const logoutMentorUseCase = new LogoutMentorUseCase(mentorRepository);
const verifyMentorUseCase = new VerifyMentorUseCase(
  mentorRepository,
  otpRepository
);
const resendOtpMentorUseCase = new ResendOtpMentorUseCase(
  mentorRepository,
  otpRepository
);

const forgotPasswordMentorUseCase = new ForgotPasswordMentorUseCase(
  mentorRepository
);

const getChangePasswordMentorUseCase = new GetChangePasswordMentorUseCase(
  mentorRepository
);

const changePasswordMentorUseCase = new ChangePasswordMentorUseCase(
  mentorRepository
);

//mentor controller
class MentorAuthController {
  constructor() {}

  //mentor signup
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

  // //mentor otp verification
  async mentorOtpVerification(req: Request, res: Response, next: NextFunction) {
    const mentorId = req.user?.userId || "";
    try {
      const response = await verifyMentorUseCase.execute(req.body, mentorId);
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

  // //mentor resend otp
  async mentorResendOtp(req: Request, res: Response, next: NextFunction) {
    const mentorId = req.user?.userId || "";
    try {
      const response = await resendOtpMentorUseCase.execute(mentorId);
      if (response.success && response.data) {
        res.status(200).json({
          message: response.message,
          user: "mentor",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  // //mentor login
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

  //mentor logout
  async mentorLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const mentorId = req.user?.userId || "";
      const response = await logoutMentorUseCase.execute(mentorId);
      if (response.success && response.data) {
        res.cookie("refreshToken", "", { httpOnly: true });
        res.cookie("accessToken", "", { httpOnly: false });
        res.cookie("user", "", { httpOnly: true });
      }
      res.status(response.statusCode).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  }

  //mentor google login and signup
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

  // //mentor forgot password
  async forgotPasswordForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;
    try {
      const response = await forgotPasswordMentorUseCase.execute(email);
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

  // //mentor get the change password
  async getChangePasswordMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { token } = req.params;
    try {
      const response = await getChangePasswordMentorUseCase.execute(token);
      if (response.success && response.data) {
        const { resetToken } = response.data as {
          resetToken: string;
        };
        //set the reset token in cookie
        res.cookie("resetToken", resetToken, { httpOnly: true });
        res.status(200).json({
          message: response.message,
          user: "mentor",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  // //mentor change password
  async changePasswordMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const { resetToken } = req.cookies;
      const response = await changePasswordMentorUseCase.execute(
        resetToken,
        req.body
      );
      if (response.success && response.data) {
        //removed the cookie
        res.cookie("resetToken", "", { httpOnly: true });
        res.status(200).json({
          message: response.message,
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

export default MentorAuthController;
