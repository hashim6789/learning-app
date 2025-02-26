// application/use_cases/auth/LoginUseCase.ts
import { IUserRepository } from "../../IRepositories/IUserRepository";
import { ResponseModel } from "../../../shared/types/ResponseModel";

import { IUser } from "../../entities/iuser.entity";
class LogoutUseCase<T extends IUser> {
  private userRepository: IUserRepository<T>;

  constructor(userRepository: IUserRepository<T>) {
    this.userRepository = userRepository;
  }

  async execute(refreshToken: string): Promise<ResponseModel> {
    const user = await this.userRepository.fetchByField({ refreshToken });
    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: "The user doesn't exist!",
      };
    }

    const updateData: Partial<T> = {
      refreshToken: null,
    } as Partial<T>;

    const unRefreshedUser = await this.userRepository.updateById(
      user.id,
      updateData
    );
    if (!unRefreshedUser) {
      return {
        statusCode: 400,
        success: false,
        message: "some thing wrong when deleting the refreshToken!",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Logout successful",
      data: {
        user: unRefreshedUser,
      },
    };
  }
}

export default LogoutUseCase;
