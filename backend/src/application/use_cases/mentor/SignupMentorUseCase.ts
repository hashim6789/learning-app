// usecases/SignupMentorUseCase.ts
import bcrypt from "bcryptjs";
import { SignupDTO } from "../../../shared/dtos/SignupDTO";
import { validateData } from "../../../shared/helpers/validateHelper";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import { Mentor } from "../../entities/Mentor";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt";

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
      null
    );

    const createdMentor = await this.mentorRepository.createMentor(mentor);

    const accessToken = generateAccessToken({
      userId: createdMentor.id,
      role: "mentor",
    });
    const refreshToken = generateRefreshToken({
      userId: createdMentor.id,
      role: "mentor",
    });

    const tokenSetMentor = await this.mentorRepository.setRefreshToken(
      createdMentor.id,
      refreshToken
    );

    if (!tokenSetMentor) {
      return {
        statusCode: 404,
        success: false,
        message: "The mentor doesn't exist",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Mentor signed up successfully",
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export default SignupMentorUseCase;
