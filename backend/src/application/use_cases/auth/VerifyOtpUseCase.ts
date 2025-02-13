// usecases/SignupUserUseCase.ts
import bcrypt from "bcryptjs";

import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IUserRepository } from "../../IRepositories/IUserRepository";

import generateOtp from "../../../shared/utils/otp";
import { sendOtpEmail } from "../../../shared/utils/mail";
import { IOtpRepository } from "../../IRepositories/IOtpRepository";
import { Otp } from "../../entities/Otp";
import { User } from "../../entities/User";
import { validateData } from "../../../shared/helpers/validateHelper";

interface VerifyOtpDTO {
  otp: string;
}

class VerifyOtpUseCase<T extends User> {
  private userRepository: IUserRepository<T>;
  private otpRepository: IOtpRepository;

  constructor(
    userRepository: IUserRepository<T>,
    otpRepository: IOtpRepository
  ) {
    this.userRepository = userRepository;
    this.otpRepository = otpRepository;
  }

  async execute(data: VerifyOtpDTO, userId: string): Promise<ResponseModel> {
    try {
      //   await validateData(data, VerifyOtpDTO);

      const existingOtp = await this.otpRepository.findOtpByUserId(userId);
      if (!existingOtp) {
        return {
          statusCode: 404,
          success: false,
          message: "The otp is doesn't exist",
        };
      }

      if (existingOtp.expiresIn + 5 * 60 * 1000 > Date.now()) {
        return {
          statusCode: 400,
          success: false,
          message: "The otp is expired!",
        };
      }

      if (!(await bcrypt.compare(data.otp, existingOtp.otp))) {
        return {
          statusCode: 400,
          success: false,
          message: "The otp is not valid!",
        };
      }

      const updateData: Partial<T> = {
        isVerified: true,
      } as Partial<T>;

      const verifiedUser = await this.userRepository.updateById(
        userId,
        updateData
      );

      if (!verifiedUser) {
        return {
          statusCode: 400,
          success: false,
          message: "The learner cannot be verified",
        };
      }

      verifiedUser.removeSensitive();

      return {
        statusCode: 200,
        success: true,
        message: "The otp is verified successfully",
        data: { user: verifiedUser },
      };
    } catch (error) {
      throw new Error("An error when the verify otp!");
    }
  }
}

export default VerifyOtpUseCase;
