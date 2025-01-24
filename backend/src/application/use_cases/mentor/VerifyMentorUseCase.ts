import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import bcrypt from "bcryptjs";
import { IOtpRepository } from "../../IRepositories/IOtpRepository";
import { validateData } from "../../../shared/helpers/validateHelper";
import { OtpDTO } from "../../../shared/dtos/OtpDTO";

class VerifyMentorUseCase {
  private mentorRepository: IMentorRepository;
  private otpRepository: IOtpRepository;
  constructor(
    mentorRepository: IMentorRepository,
    otpRepository: IOtpRepository
  ) {
    this.mentorRepository = mentorRepository;
    this.otpRepository = otpRepository;
  }

  async execute(otpData: OtpDTO, mentorId: string): Promise<ResponseModel> {
    try {
      await validateData(otpData, OtpDTO);
      const existingOtp = await this.otpRepository.findOtpByUseId(mentorId);
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

      if (!(await bcrypt.compare(otpData.otp, existingOtp.otp))) {
        return {
          statusCode: 400,
          success: false,
          message: "The otp is not valid!",
        };
      }

      const verifiedMentor = await this.mentorRepository.verifyMentor(mentorId);

      if (!verifiedMentor) {
        return {
          statusCode: 400,
          success: false,
          message: "The mentor cannot be verified",
        };
      }

      verifiedMentor.removeSensitive();

      return {
        statusCode: 200,
        success: true,
        message: "The otp is verified successfully",
        data: { mentor: verifiedMentor },
      };
    } catch (error) {
      throw new Error("An error when the otp is verified.");
    }
  }
}

export default VerifyMentorUseCase;
