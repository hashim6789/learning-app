import bcrypt from "bcryptjs";

import { SignupDTO } from "../../../shared/dtos/SignupDTO";
import { validateData } from "../../../shared/helpers/validateHelper";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import { Learner } from "../../entities/Learner";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { generateAccessToken } from "../../../shared/utils/jwt";
import { generateRefreshToken } from "../../../shared/utils/uuid";

class SignupLearnerUseCase {
  private learnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(data: SignupDTO): Promise<ResponseModel> {
    await validateData(data, SignupDTO);

    const existingLearner = await this.learnerRepository.findByEmail(
      data.email
    );

    if (existingLearner) {
      return {
        statusCode: 400,
        success: false,
        message: "The user is already exist",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const learner = new Learner(
      null,
      "",
      data.firstName,
      data.lastName || null,
      data.email,
      hashedPassword,
      null,
      [],
      false
    );

    const createdLearner = await this.learnerRepository.createLearner(learner);
    // Generate tokens
    const accessToken = generateAccessToken({
      userId: createdLearner.id,
      role: "mentor",
    });
    const refreshToken = generateRefreshToken();

    return {
      statusCode: 200,
      success: true,
      message: "Learner Signupped successful",
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export default SignupLearnerUseCase;
