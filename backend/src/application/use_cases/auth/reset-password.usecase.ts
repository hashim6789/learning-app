import { ResponseModel } from "../../../shared/types/ResponseModel";
import { sendForgotPasswordMail } from "../../../shared/utils/mail.util";
import { ILearnerRepository } from "../../../infrastructures/database/repositories/interface/ILearnerRepository";
import { verifyAccessToken as verifyToken } from "../../../shared/utils/jwt.util";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import { validateData } from "../../../shared/helpers/validateHelper";
import { ResetPasswordDTO } from "../../../shared/dtos/ChangePasswordDTO";

import bcrypt from "bcryptjs";
import { IUserRepository } from "../../../infrastructures/database/repositories/interface/IUserRepository";
import { User } from "../../entities/user.entity";

class ResetPasswordUseCase<T extends User> {
  private userRepository: IUserRepository<T>;
  constructor(userRepository: IUserRepository<T>) {
    this.userRepository = userRepository;
  }

  async execute(token: string, data: ResetPasswordDTO): Promise<ResponseModel> {
    try {
      await validateData(data, ResetPasswordDTO);

      const decodedData = verifyToken(token);
      if (!decodedData) {
        return {
          statusCode: 400,
          success: false,
          message: "no token is expired",
        };
      }
      const existingUser = await this.userRepository.fetchById(
        decodedData.userId
      );
      if (!existingUser) {
        return {
          statusCode: 404,
          success: false,
          message: `no ${data.role} exist in this email!`,
        };
      }

      if (existingUser.resetToken !== token) {
        return {
          statusCode: 400,
          success: false,
          message: "this is not a valid token",
        };
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const updateData: Partial<T> = {
        resetToken: null,
        password: hashedPassword,
      } as Partial<T>;
      const updatedLearner = await this.userRepository.updateById(
        existingUser.id,
        updateData
      );
      if (!updatedLearner) {
        return {
          statusCode: 400,
          success: false,
          message: "failed the password update!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The password reset successfully",
        data: {
          learner: updatedLearner,
        },
      };
    } catch (error) {
      throw new Error("An error when forgot password generating!");
    }
  }
}

export default ResetPasswordUseCase;
