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

class SignupMentorUseCase {
  private mentorRepository: IMentorRepository;

  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(data: SignupDTO): Promise<ResponseModel> {
    await validateData(data, SignupDTO);

    const existingMentor = await this.mentorRepository.findByEmail(data.email);
    if (existingMentor) {
      return {
        statusCode: 400,
        success: false,
        message: "The mentor already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const mentor = new Mentor(
      "",
      null,
      data.firstName,
      data.lastName || null,
      data.email,
      null,
      null,
      [],
      false,
      hashedPassword,
      null,
      null,
      null
    );

    const createdMentor = await this.mentorRepository.createMentor(mentor);

    if (!createdMentor) {
      return {
        statusCode: 400,
        success: false,
        message: "The mentor creation failed!",
      };
    }

    const accessToken = generateAccessToken({
      userId: createdMentor.id,
      role: "mentor",
    });
    const refreshToken = generateRefreshToken();

    const refreshedMentor = await this.mentorRepository.setRefreshToken(
      createdMentor.id,
      refreshToken
    );

    if (!refreshedMentor) {
      return {
        statusCode: 404,
        success: false,
        message: "The mentor can't set the refresh token",
      };
    }

    const otp = generateOtp();
    console.log(otp, "otp");
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpCreatedMentor = await this.mentorRepository.setOtpToDB(
      refreshedMentor.id,
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
      message: "Mentor signed up successfully",
      data: {
        accessToken,
        refreshToken,
        mentor: otpCreatedMentor,
      },
    };
  }
}

export default SignupMentorUseCase;
