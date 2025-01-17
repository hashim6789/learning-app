import { Request, Response, NextFunction } from "express";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import { IAdminLoginUseCase } from "../../IUseCases/admin/IAdminLoginUseCase";
import { Admin } from "../../../application/entities/Admin";
// import cookieConfig from "../../../shared/configs/cookieConfig";

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
}

export default AuthController;
