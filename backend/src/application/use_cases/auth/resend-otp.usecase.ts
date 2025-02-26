// usecases/SignupUserUseCase.ts
import bcrypt from "bcryptjs";

import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IUserRepository } from "../../IRepositories/IUserRepository";

import generateOtp from "../../../shared/utils/otp.util";
import { sendOtpEmail } from "../../../shared/utils/mail.util";
import { IOtpRepository } from "../../IRepositories/IOtpRepository";
import { Otp } from "../../entities/otp.entity";
import { User } from "../../entities/user.entity";

class ResendOtpUseCase<T extends User> {
  private userRepository: IUserRepository<T>;
  private otpRepository: IOtpRepository;

  constructor(
    userRepository: IUserRepository<T>,
    otpRepository: IOtpRepository
  ) {
    this.userRepository = userRepository;
    this.otpRepository = otpRepository;
  }

  async execute(userId: string): Promise<ResponseModel> {
    try {
      const otpCount = await this.otpRepository.deleteOtpByUserId(userId);

      const otp = generateOtp();
      const hashedOtp = await bcrypt.hash(otp, 10);

      const otpEntity = new Otp("", userId, hashedOtp, Date.now());

      const createdOtp = await this.otpRepository.createOtp(otpEntity);

      if (!createdOtp) {
        return {
          statusCode: 400,
          success: false,
          message: "The otp can't be set to the db",
        };
      }

      // console.log("otp =", createdOtp);
      console.log(otp, "otp");
      console.log(this.userRepository);
      const user = await this.userRepository.fetchById(userId);
      console.log(user);
      if (!user) {
        return {
          statusCode: 400,
          success: false,
          message: "The user is doesn't exist!",
        };
      }

      const isSended = await sendOtpEmail(user.email, otp);
      console.log("otp count =", otpCount);
      if (!isSended) {
        return {
          statusCode: 400,
          success: false,
          message: "The mail is not sent!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "User signed up successfully",
        data: {
          otp: createdOtp,
        },
      };
    } catch (error) {
      throw new Error("An error when the resend otp!");
    }
  }
}

export default ResendOtpUseCase;
