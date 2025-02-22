// interfaces/controllers/AuthController.ts
import { Request, Response, NextFunction } from "express";
import { LoginDTO } from "../../shared/dtos/LoginDTO";
import AdminRepository from "../../infrastructures/database/repositories/AdminRepository";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import LoginUseCase from "../../application/use_cases/auth/LoginUseCase";
import LogoutUseCase from "../../application/use_cases/auth/LogoutUseCase";
import { IUserRepository } from "../../application/IRepositories/IUserRepository";
import { User } from "../../application/entities/User";
import GoogleSignupUseCase from "../../application/use_cases/auth/GoogleSignupUseCase";
import { UserType } from "aws-sdk/clients/workdocs";
import { GoogleSignupDTO } from "../../shared/dtos/GoogleSignupDTO";
import { SignupDTO } from "../../shared/dtos/SignupDTO";
import SignupUseCase from "../../application/use_cases/auth/SignupUseCase";
import OtpRepository from "../../infrastructures/database/repositories/OtpRepository";
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
import ResendOtpUseCase from "../../application/use_cases/auth/ResendOtpUseCase";
import VerifyOtpUseCase from "../../application/use_cases/auth/VerifyOtpUseCase";
import ForgotPasswordUseCase from "../../application/use_cases/auth/ForgotPasswordUseCase";
import GetChangePasswordUseCase from "../../application/use_cases/auth/GetChangePasswordUseCase";
import ResetPasswordUseCase from "../../application/use_cases/auth/ResetPasswordUseCase";
import { ResetPasswordDTO } from "../../shared/dtos/ChangePasswordDTO";

function getRepository(role: string): IUserRepository<any> {
  switch (role) {
    case "admin":
      return new AdminRepository();
    case "mentor":
      return new MentorRepository();
    case "learner":
      return new LearnerRepository();
    default:
      throw new Error("Invalid role");
  }
}

interface Data {
  accessToken: string;
  refreshToken: string;
  user: User;
}
interface LogoutDTO {
  role: string;
}

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const loginDTO: LoginDTO = req.body;
    try {
      const userRepository = getRepository(loginDTO.role);
      const loginUseCase = new LoginUseCase(userRepository);

      const response = await loginUseCase.execute(loginDTO);
      //     ^?

      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data as Data;
        //                                   ^?

        res.cookie("accessToken", accessToken, { httpOnly: false });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("user", loginDTO.role, { httpOnly: true });

        res.status(200).json({
          success: true,
          message: response.message,
          user: loginDTO.role,
          data: user,
        });
      } else {
        res.status(400).json({ success: false, message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  // Method for logout
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const logoutDTO: LogoutDTO = req.body;
      const { refreshToken } = req.cookies;
      const userRepository = getRepository(logoutDTO.role);
      const logoutUseCase = new LogoutUseCase(userRepository);
      const response = await logoutUseCase.execute(refreshToken);

      if (response.success && response.data) {
        const { user } = response.data as {
          user: User;
        };
        res.clearCookie("refreshToken", { httpOnly: true });
        res.clearCookie("accessToken", { httpOnly: false });
        res.clearCookie("user", { httpOnly: true });
        res.status(200).json({
          success: true,
          message: response.message,
          user: "user",
        });
      } else {
        res.status(response.statusCode).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async googleSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, role } = req.body;
      const googleSignupDTO: GoogleSignupDTO = { token, role };

      const userRepository = getRepository(googleSignupDTO.role);
      const googleSignupUseCase = new GoogleSignupUseCase(userRepository);
      const response = await googleSignupUseCase.execute(googleSignupDTO);

      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data as {
          accessToken: string;
          refreshToken: string;
          user: User;
        };

        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("accessToken", accessToken, { httpOnly: false });
        res.cookie("user", googleSignupDTO.role, { httpOnly: true });

        res.status(200).json({
          message: response.message,
          user: googleSignupDTO.role,
          data: user,
        });

        // Send access token in response
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  // user signup
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const signupDTO: SignupDTO = req.body;
      const userRepository = getRepository(signupDTO.role);
      const otpRepository = new OtpRepository();
      const signupUseCase = new SignupUseCase(userRepository, otpRepository);

      const response = await signupUseCase.execute(signupDTO);
      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data as {
          accessToken: string;
          refreshToken: string;
          user: User;
        };

        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("accessToken", accessToken, { httpOnly: false });
        res.cookie("user", signupDTO.role, { httpOnly: true });

        res.status(200).json({
          message: response.message,
          user: signupDTO.role,
          data: user,
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //user forgot password
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email, role } = req.body;

    try {
      const userRepository = getRepository(role);
      const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository);
      const response = await forgotPasswordUseCase.execute({ email, role });
      if (response.success && response.data) {
        const { user } = response.data as {
          user: User;
        };
        res.status(200).json({
          message: response.message,
          data: user,
          user: "user",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //user get the change password
  async getChangePassword(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    const role = req.query.role as UserType;
    try {
      const userRepository = getRepository(role);
      const getChangePasswordUseCase = new GetChangePasswordUseCase(
        userRepository
      );
      const response = await getChangePasswordUseCase.execute(token, role);
      if (response.success && response.data) {
        const { resetToken } = response.data as {
          resetToken: string;
        };

        //set the reset token in cookie
        res.cookie("resetToken", resetToken, { httpOnly: true });

        res.status(200).json({
          message: response.message,
          user: "user",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //user change password
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { resetToken } = req.cookies;
      const { role, password } = req.body as ResetPasswordDTO;

      const userRepository = getRepository(role);
      const resetPasswordUseCase = new ResetPasswordUseCase(userRepository);

      const response = await resetPasswordUseCase.execute(resetToken, {
        role,
        password,
      });
      if (response.success && response.data) {
        //removed the cookie
        res.cookie("resetToken", "", { httpOnly: true });
        res.status(200).json({
          message: response.message,
          user: "user",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //user otp verification
  async otpVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId || "";
      const role = req.user?.role || null;
      if (!role) {
        res.status(400).json({ message: "invalid role" });
        return;
      }

      const userRepository = getRepository(role);
      const otpRepository = new OtpRepository();
      const verifyOtpUseCase = new VerifyOtpUseCase(
        userRepository,
        otpRepository
      );
      const response = await verifyOtpUseCase.execute(req.body, userId);
      if (response.success && response.data) {
        const { user } = response.data as {
          user: User;
        };
        // Send access token in response
        res.status(200).json({
          message: response.message,
          data: user,
          user: "user",
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //user resend otp
  async resendOtp(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.userId || "";
    const role = req.user?.role || null;
    try {
      if (!role) {
        res.status(400).json({ message: "invalid role" });
        return;
      }
      const userRepository = getRepository(role);
      const otpRepository = new OtpRepository();
      const resendOtpUseCase = new ResendOtpUseCase(
        userRepository,
        otpRepository
      );
      const response = await resendOtpUseCase.execute(userId);

      if (response.success && response.data) {
        res.status(200).json({
          message: response.message,
          user: role,
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
