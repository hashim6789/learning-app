import { Request, Response, NextFunction } from "express";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import { IAdminLoginUseCase } from "../../IUseCases/admin/IAdminLoginUseCase";
import { Admin } from "../../../application/entities/Admin";
import { IAdminLogoutUseCase } from "../../IUseCases/admin/IAdminLogoutUseCase";
// import cookieConfig from "../../../shared/configs/cookieConfig";

class AuthController {
  private adminLoginUseCase: IAdminLoginUseCase;
  private adminLogoutUseCase: IAdminLogoutUseCase;
  constructor(
    adminLoginUseCase: IAdminLoginUseCase,
    adminLogoutUseCase: IAdminLogoutUseCase
  ) {
    this.adminLoginUseCase = adminLoginUseCase;
    this.adminLogoutUseCase = adminLogoutUseCase;
  }
  async AdminLogin(req: Request, res: Response, next: NextFunction) {
    const loginDTO: LoginDTO = req.body;
    try {
      const response = await this.adminLoginUseCase.execute(loginDTO);

      if (response.success && response.data) {
        const { accessToken, refreshToken, admin } = response.data as {
          accessToken: string;
          refreshToken: string;
          admin: Admin;
        };

        // Set refresh token as an HTTP-only cookie
        res.cookie("accessToken", accessToken, { httpOnly: false });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        // Send access token in response
        res.status(200).json({
          message: response.message,
          user: "admin",
          data: admin,
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async AdminLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const response = await this.adminLogoutUseCase.execute(refreshToken);

      if (response.success && response.data) {
        const { admin } = response.data as {
          admin: Admin;
        };

        res.cookie("refreshToken", "", { httpOnly: true });
      }
      res.status(response.statusCode).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
