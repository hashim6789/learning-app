// usecases/SignupMentorUseCase.ts
import bcrypt from "bcryptjs";
import { SignupDTO } from "../../../shared/dtos/SignupDTO";
import { validateData } from "../../../shared/helpers/validateHelper";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import { Mentor } from "../../entities/Mentor";
import { generateAccessToken } from "../../../shared/utils/jwt";
import { generateRefreshToken } from "../../../shared/utils/uuid";
import generateOtp from "../../../shared/utils/otp";
import { sendOtpEmail } from "../../../shared/utils/mail";

class ResendOtpMentorUseCase {
  private mentorRepository: IMentorRepository;

  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(mentorId: string): Promise<ResponseModel> {
    const existingMentor = await this.mentorRepository.fetchMentorById(
      mentorId
    );
    if (!existingMentor) {
      return {
        statusCode: 400,
        success: false,
        message: "The mentor doesn't exists",
      };
    }

    const otp = generateOtp();
    console.log(otp, "otp");
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpCreatedMentor = await this.mentorRepository.setOtpToDB(
      mentorId,
      hashedOtp
    );
    if (!otpCreatedMentor) {
      return {
        statusCode: 400,
        success: false,
        message: "The otp can't be set to the db",
      };
    }
    console.log("token =", otpCreatedMentor);

    await sendOtpEmail(otpCreatedMentor.email, otp);

    return {
      statusCode: 200,
      success: true,
      message: "Mentor resend otp successfully",
      data: {
        mentor: otpCreatedMentor,
      },
    };
  }
}

export default ResendOtpMentorUseCase;
