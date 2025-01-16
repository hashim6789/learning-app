import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { Mentor } from "../../entities/Mentor";
import { validateData } from "../../../shared/helpers/validateHelper";
import { IMentorRepository } from "../../../application/IRepositories/IMentorRepository";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";

class LoginMentorUseCase {
  private mentorRepository;
  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(data: LoginDTO): Promise<ResponseModel> {
    await validateData(data, LoginDTO);

    const existingMentor = await this.mentorRepository.findByEmail(data.email);

    if (!existingMentor)
      return {
        statusCode: 404,
        success: false,
        message: "The user is doesn't exist",
      };

    const isBlocked = existingMentor.isBlocked;

    const isValidPassword = await bcrypt.compare(
      data.password,
      existingMentor.password as string
    );

    if (isBlocked || !isValidPassword) {
      return {
        statusCode: 400,
        success: false,
        message: "Invalid Credentials or blocked",
      };
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: existingMentor.id,
      role: "mentor",
    });
    const refreshToken = generateRefreshToken({
      userId: existingMentor.id,
      role: "mentor",
    });

    const tokenSetMentor = await this.mentorRepository.setRefreshToken(
      existingMentor.id,
      refreshToken
    );

    console.log(tokenSetMentor);

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
      message: "Mentor loginned successful",
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export default LoginMentorUseCase;
