import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import bcrypt from "bcryptjs";

class VerifyMentorUseCase {
  private mentorRepository: IMentorRepository;
  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(otp: string, mentorId: string): Promise<ResponseModel> {
    try {
      const mentor = await this.mentorRepository.fetchMentorById(mentorId);
      if (!mentor) {
        return {
          statusCode: 404,
          success: false,
          message: "The mentor doesn't exist",
        };
      }

      const isBlocked = mentor.isBlocked;
      const otpExpiration = mentor.otpExpiration ? mentor.otpExpiration : 0;

      if (isBlocked || Date.now() > otpExpiration) {
        return {
          statusCode: 400,
          success: false,
          message: "The mentor is blocked or otp is expired",
        };
      }

      if (
        otp === null ||
        mentor.otp === null ||
        !(await bcrypt.compare(otp, mentor.otp))
      ) {
        return {
          statusCode: 400,
          success: false,
          message: "The otp is not valid",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The otp is verified successfully",
        data: { mentor },
      };
    } catch (error) {
      throw new Error("An error when the otp is verified.");
    }
  }
}

export default VerifyMentorUseCase;
