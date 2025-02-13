// application/use_cases/auth/LoginUseCase.ts
import { IUserRepository } from "../../IRepositories/IUserRepository";
import { LoginDTO } from "../../../shared/dtos/LoginDTO";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { generateToken } from "../../../shared/utils/jwt";
import { validateData } from "../../../shared/helpers/validateHelper";
import { User } from "../../entities/User";
import { generateRefreshToken } from "../../../shared/utils/uuid";
import { IUser } from "../../entities/IUser";
import bcrypt from "bcryptjs";
class LoginUseCase<T extends IUser> {
  private userRepository: IUserRepository<T>;

  constructor(userRepository: IUserRepository<T>) {
    this.userRepository = userRepository;
  }

  async execute(data: LoginDTO): Promise<ResponseModel> {
    await validateData(data, LoginDTO);

    const user = await this.userRepository.fetchByField({ email: data.email });
    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: `The ${data.role} doesn't exist!`,
      };
    }
    if (user.isBlocked) {
      return {
        statusCode: 400,
        success: false,
        message: `The ${data.role} is blocked!`,
      };
    }

    console.log(user);
    if (!user.isVerified) {
      return {
        statusCode: 400,
        success: false,
        message: `The ${data.role} is not verified can you re-register!`,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password as string
    );
    if (!isPasswordValid) {
      return {
        statusCode: 401,
        success: false,
        message: "Invalid credentials or blocked!",
      };
    }
    const accessToken = generateToken({
      userId: user.id,
      role: data.role,
    });

    const refreshToken = generateRefreshToken();

    const updateData: Partial<T> = {
      refreshToken,
    } as Partial<T>;

    const updatedUser = await this.userRepository.updateById(
      user.id,
      updateData
    );

    if (!updatedUser) {
      return {
        success: false,
        statusCode: 400,
        message: "An error happened when setting the refresh token!",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        user: updatedUser,
      },
    };
  }
}

export default LoginUseCase;
