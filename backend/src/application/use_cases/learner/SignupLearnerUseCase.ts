// usecases/SignupLearnerUseCase.ts
import bcrypt from "bcryptjs";
import { SignupDTO } from "../../../shared/dtos/SignupDTO";
import { validateData } from "../../../shared/helpers/validateHelper";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import { Learner } from "../../entities/Learner";
import { generateAccessToken } from "../../../shared/utils/jwt";
import { generateRefreshToken } from "../../../shared/utils/uuid";
import generateOtp from "../../../shared/utils/otp";
import { sendOtpEmail } from "../../../shared/utils/mail";
import { Otp } from "../../entities/Otp";
import { IOtpRepository } from "../../IRepositories/IOtpRepository";

class SignupLearnerUseCase {
  private learnerRepository: ILearnerRepository;
  private otpRepository: IOtpRepository;

  constructor(
    learnerRepository: ILearnerRepository,
    otpRepository: IOtpRepository
  ) {
    this.learnerRepository = learnerRepository;
    this.otpRepository = otpRepository;
  }

  async execute(data: SignupDTO): Promise<ResponseModel> {
    await validateData(data, SignupDTO);

    const existingLearner = await this.learnerRepository.findByEmail(
      data.email
    );

    if (existingLearner) {
      if (!existingLearner.isVerified) {
        await this.learnerRepository.deleteLearnerById(existingLearner.id);
        console.log("deleted user");
      } else {
        return {
          statusCode: 400,
          success: false,
          message: "The learner already exists",
        };
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const refreshToken = generateRefreshToken();

    const learner = new Learner(
      null,
      "",
      data.firstName,
      data.lastName || null,
      data.email,
      hashedPassword,
      null,
      [],
      false,
      false,
      refreshToken,
      null
    );

    const createdLearner = await this.learnerRepository.createLearner(learner);

    if (!createdLearner) {
      return {
        statusCode: 400,
        success: false,
        message: "The learner creation failed!",
      };
    }
    const accessToken = generateAccessToken({
      userId: createdLearner.id,
      role: "learner",
    });

    const otp = generateOtp();
    console.log(otp, "otp");
    const hashedOtp = await bcrypt.hash(otp, 10);

    const otpEntity = new Otp("", createdLearner.id, hashedOtp, Date.now());

    const createdOtp = await this.otpRepository.createOtp(otpEntity);

    if (!createdOtp) {
      return {
        statusCode: 400,
        success: false,
        message: "The otp can't be set to the db",
      };
    }

    const isSended = await sendOtpEmail(createdLearner.email, otp);
    if (!isSended) {
      return {
        statusCode: 400,
        success: false,
        message: "The mail is not sent!",
      };
    }

    createdLearner.removeSensitive();

    return {
      statusCode: 200,
      success: true,
      message: "Learner signed up successfully",
      data: {
        accessToken,
        refreshToken,
        learner: createdLearner,
      },
    };
  }
}

export default SignupLearnerUseCase;
