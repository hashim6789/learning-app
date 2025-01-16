import { ResponseModel } from "../../../shared/types/ResponseModel";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import { validateData } from "../../../shared/helpers/validateHelper";
import { IAdminRepository } from "../../IRepositories/IAdminRepository";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt";

class AdminLoginUseCase {
  private adminRepository;
  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(data: LoginDTO): Promise<ResponseModel> {
    await validateData(data, LoginDTO);

    const admin = await this.adminRepository.findByEmail(data.email);
    if (!admin || admin.password !== data.password) {
      return {
        statusCode: 404,
        success: false,
        message: "The admin doesn't exist or invalid credentials!",
      };
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: admin.id,
      role: "admin",
    });
    const refreshToken = generateRefreshToken({
      userId: admin.id,
      role: "admin",
    });

    return {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export default AdminLoginUseCase;
