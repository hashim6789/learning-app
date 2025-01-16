import { Request, Response, NextFunction } from "express";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import { IAdminLoginUseCase } from "../../IUseCases/admin/IAdminLoginUseCase";

class AuthController {
  private adminLoginUseCase: IAdminLoginUseCase;
  constructor(adminLoginUseCase: IAdminLoginUseCase) {
    this.adminLoginUseCase = adminLoginUseCase;
  }
  async AdminLogin(req: Request, res: Response, next: NextFunction) {
    const loginDTO: LoginDTO = req.body;
    try {
      const response = await this.adminLoginUseCase.execute(loginDTO);

      if (response.success && response.data) {
        const { accessToken, refreshToken } = response.data as {
          accessToken: string;
          refreshToken: string;
        };

        // Set refresh token as an HTTP-only cookie
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production", // Set true in production
        //   sameSite: "strict",
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });

        // Send access token in response
        res.status(200).json({
          message: response.message,
          accessToken,
          refreshToken,
          user: "admin",
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
