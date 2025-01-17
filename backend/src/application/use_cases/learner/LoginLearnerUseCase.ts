import LearnerModel from "../../../infrastructures/database/models/LearnerModel";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import { validateData } from "../../../shared/helpers/validateHelper";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import { generateAccessToken } from "../../../shared/utils/jwt";
import bcrypt from "bcryptjs";
import { generateRefreshToken } from "../../../shared/utils/uuid";

class LoginLearnerUseCase {
  private learnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(data: LoginDTO): Promise<ResponseModel> {
    await validateData(data, LoginDTO);
    const learner = await this.learnerRepository.findByEmail(data.email);
    if (!learner) {
      return {
        statusCode: 404,
        success: false,
        message: "The learner is doesn't exist!",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      learner.password as string
    );
    if (!isPasswordValid) {
      return {
        statusCode: 401,
        success: false,
        message: "Invalid credentials!",
      };
    }

    const accessToken = generateAccessToken({
      userId: learner.id,
      role: "mentor",
    });
    const refreshToken = generateRefreshToken();

    return {
      statusCode: 200,
      success: true,
      message: "Learner loginned successful",
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export default LoginLearnerUseCase;
