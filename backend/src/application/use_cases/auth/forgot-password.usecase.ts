// usecases/SignupUserUseCase.ts
import bcrypt from "bcryptjs";

import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IUserRepository } from "../../../infrastructures/database/repositories/interface/IUserRepository";

import generateOtp from "../../../shared/utils/otp.util";
import {
  sendForgotPasswordMail,
  sendOtpEmail,
} from "../../../shared/utils/mail.util";
import { IOtpRepository } from "../../../infrastructures/database/repositories/interface/IOtpRepository";
import { Otp } from "../../entities/otp.entity";
import { User } from "../../entities/user.entity";
import { UserType } from "../../../shared/types";
import { generateToken } from "../../../shared/utils/jwt.util";

interface ForgotDTO {
  email: string;
  role: UserType;
}

class ForgotPasswordUseCase<T extends User> {
  private userRepository: IUserRepository<T>;

  constructor(userRepository: IUserRepository<T>) {
    this.userRepository = userRepository;
  }

  async execute(data: ForgotDTO): Promise<ResponseModel> {
    try {
      const existingUser = await this.userRepository.fetchByField({
        email: data.email,
      });
      if (!existingUser) {
        return {
          statusCode: 404,
          success: false,
          message: `no ${data.role} exist in this email!`,
        };
      }

      const resetToken = generateToken({
        userId: existingUser.id,
        role: data.role,
      });

      const updateData: Partial<T> = {
        resetToken,
      } as Partial<T>;

      const tokenSetLearner = await this.userRepository.updateById(
        existingUser.id,
        updateData
      );

      if (!tokenSetLearner) {
        return {
          statusCode: 400,
          success: false,
          message: "The reset token cannot be set",
        };
      }
      const isSended = await sendForgotPasswordMail(
        data.role,
        existingUser,
        resetToken
      );
      if (!isSended) {
        return {
          statusCode: 400,
          success: false,
          message: "The forgot password cannot be sent",
        };
      }

      existingUser.removeSensitive();

      return {
        statusCode: 200,
        success: true,
        message: "The forgot password sent successfully",
        data: {
          learner: existingUser,
        },
      };
    } catch (error) {
      throw new Error("An error when the forgot password!");
    }
  }
}

export default ForgotPasswordUseCase;
