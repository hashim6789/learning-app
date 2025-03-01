import { ResponseModel } from "../../../shared/types/ResponseModel";
import { sendForgotPasswordMail } from "../../../shared/utils/mail.util";
import { ILearnerRepository } from "../../../infrastructures/database/repositories/interface/ILearnerRepository";
import { verifyAccessToken as verifyToken } from "../../../shared/utils/jwt.util";
import { IUserRepository } from "../../../infrastructures/database/repositories/interface/IUserRepository";
import { User } from "../../entities/user.entity";
import { UserType } from "../../../shared/types";

class GetChangePasswordUseCase<T extends User> {
  private userRepository: IUserRepository<T>;
  constructor(userRepository: IUserRepository<T>) {
    this.userRepository = userRepository;
  }

  async execute(token: string, role: string): Promise<ResponseModel> {
    try {
      const decodedData = verifyToken(token);
      if (!decodedData || decodedData.role !== role) {
        return {
          statusCode: 400,
          success: false,
          message: "no token is expired or not valid",
        };
      }

      const existingUser = await this.userRepository.fetchById(
        decodedData.userId
      );
      if (!existingUser) {
        return {
          statusCode: 404,
          success: false,
          message: `no ${role} doesn't exist!`,
        };
      }

      if (existingUser.resetToken !== token) {
        return {
          statusCode: 404,
          success: false,
          message: "no reset token is not valid",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The change password page get successfully",
        data: {
          resetToken: existingUser.resetToken,
        },
      };
    } catch (error) {
      throw new Error("An error when forgot password generating!");
    }
  }
}

export default GetChangePasswordUseCase;
