import bcrypt from "bcryptjs";
import { SignupDTO } from "../../../shared/dtos/SignupDTO";
import { validateData } from "../../../shared/helpers/validateHelper";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IOtpRepository } from "../../../infrastructures/database/repositories/interface/IOtpRepository";
import { generateToken } from "../../../shared/utils/jwt.util";
import { generateRefreshToken } from "../../../shared/utils/uuid.util";
import generateOtp from "../../../shared/utils/otp.util";
import { sendOtpEmail } from "../../../shared/utils/mail.util";
import { Otp } from "../../entities/otp.entity";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../../infrastructures/database/repositories/interface/IUserRepository";

class SignupUseCase<T extends User> {
  private userRepository: IUserRepository<T>;
  private otpRepository: IOtpRepository;

  constructor(
    userRepository: IUserRepository<T>,
    otpRepository: IOtpRepository
  ) {
    this.userRepository = userRepository;
    this.otpRepository = otpRepository;
  }

  private async validateAndHashPassword(data: SignupDTO): Promise<string> {
    await validateData(data, SignupDTO);
    return await bcrypt.hash(data.password, 10);
  }

  private async createNewUser(
    data: SignupDTO,
    hashedPassword: string,
    refreshToken: string
  ): Promise<T> {
    return new User(
      "",
      data.email,
      hashedPassword,
      false,
      false,
      refreshToken,
      null,
      null,
      data.firstName,
      data.lastName || null,
      null
    ) as unknown as T;
  }

  private async handleExistingUser(existingUser: T | null): Promise<void> {
    if (existingUser && !existingUser.isVerified) {
      await this.userRepository.deleteById(existingUser.id);
      console.log("deleted user");
    }
  }

  private async createOtpAndSendEmail(user: T): Promise<boolean> {
    const otp = generateOtp();
    console.log(otp, "otp");
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpEntity = new Otp("", user.id, hashedOtp, Date.now());

    const createdOtp = await this.otpRepository.createOtp(otpEntity);
    if (!createdOtp) return false;

    return await sendOtpEmail(user.email, otp);
  }

  private generateResponse(
    user: T,
    accessToken: string,
    refreshToken: string
  ): ResponseModel {
    user.removeSensitive();
    return {
      statusCode: 201,
      success: true,
      message: "User signed up successfully",
      data: {
        accessToken,
        refreshToken,
        user,
      },
    };
  }

  async execute(data: SignupDTO): Promise<ResponseModel> {
    await validateData(data, SignupDTO);
    const existingUser = await this.userRepository.fetchByField({
      email: data.email,
    });
    if (existingUser && existingUser.isVerified) {
      return {
        statusCode: 400,
        success: false,
        message: "The user already exists",
      };
    }

    await this.handleExistingUser(existingUser);
    const hashedPassword = await this.validateAndHashPassword(data);
    const refreshToken = generateRefreshToken();

    const newUser = await this.createNewUser(
      data,
      hashedPassword,
      refreshToken
    );
    const createdUser = await this.userRepository.create(newUser);

    if (!createdUser) {
      return {
        statusCode: 400,
        success: false,
        message: "The user creation failed!",
      };
    }

    const accessToken = generateToken({
      userId: createdUser.id,
      role: data.role,
    });

    const otpSent = await this.createOtpAndSendEmail(createdUser);
    if (!otpSent) {
      return {
        statusCode: 400,
        success: false,
        message: "The mail is not sent!",
      };
    }

    return this.generateResponse(createdUser, accessToken, refreshToken);
  }
}

export default SignupUseCase;
