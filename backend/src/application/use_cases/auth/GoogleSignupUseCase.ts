import { IUserRepository } from "../../IRepositories/IUserRepository";
import axios from "axios";
import { generateToken } from "../../../shared/utils/jwt";
import { User } from "../../entities/User";
import { generateRefreshToken } from "../../../shared/utils/uuid";
import { UserType } from "../../../shared/types";
import { Learner } from "../../entities/Learner";
import { Mentor } from "../../entities/Mentor";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { GoogleSignupDTO } from "../../../shared/dtos/GoogleSignupDTO";

const isUserType = (role: UserType): boolean => {
  return ["learner", "mentor"].includes(role);
};

class GoogleSignupUseCase<T extends User> {
  private userRepository: IUserRepository<T>;
  constructor(userRepository: IUserRepository<T>) {
    this.userRepository = userRepository;
  }

  private async getGoogleUserData(token: string): Promise<any> {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );
    return response.data;
  }

  private createNewUser(data: any, refreshToken: string, role: UserType): T {
    switch (role) {
      case "learner":
        return new Learner(
          "",
          data.email,
          null,
          false,
          data.email_verified,
          refreshToken,
          null,
          data.picture || null,
          data.given_name,
          data.family_name || null,
          data.sub,
          []
        ) as unknown as T;
      case "mentor":
        return new Mentor(
          "",
          data.email,
          null,
          false,
          data.email_verified,
          refreshToken,
          null,
          data.picture || null,
          data.given_name,
          data.family_name || null,
          data.sub,
          [],
          []
        ) as unknown as T;
      default:
        throw new Error("Invalid role");
    }
  }

  private async updateUser(
    fetchedUser: User,
    data: any,
    refreshToken: string
  ): Promise<User | null> {
    const updateData: Partial<T> = {
      googleId: data.sub,
      profilePicture: data.picture,
      isVerified: true,
      refreshToken,
    } as Partial<T>;

    return this.userRepository.updateById(fetchedUser.id, updateData);
  }

  private handleUnverifiedOrBlockedUser(
    fetchedUser: User
  ): { statusCode: number; success: boolean; message: string } | null {
    if (fetchedUser.isBlocked) {
      return {
        statusCode: 400,
        success: false,
        message: "User is blocked!",
      };
    } else if (!fetchedUser.isVerified) {
      return {
        statusCode: 400,
        success: false,
        message: "User is unverified!",
      };
    }
    return null;
  }

  private generateResponse(
    user: User,
    role: UserType
  ): { statusCode: number; success: boolean; message: string; data: any } {
    const accessToken = generateToken({
      userId: user.id,
      role,
    });

    user.removeSensitive();

    return {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken: user.refreshToken,
        user,
      },
    };
  }

  async execute(googleData: GoogleSignupDTO): Promise<ResponseModel> {
    const isValidUser = isUserType(googleData.role);

    if (!isValidUser) {
      return {
        statusCode: 400,
        success: false,
        message: "invalid user Type!!!",
      };
    }
    const data = await this.getGoogleUserData(googleData.token);
    const fetchedUser = await this.userRepository.fetchByField({
      email: data.email,
    });
    const refreshToken = generateRefreshToken();

    let user: User | null = null;

    if (!fetchedUser) {
      user = await this.userRepository.create(
        this.createNewUser(data, refreshToken, googleData.role)
      );
    } else {
      const unverifiedOrBlockedResponse =
        this.handleUnverifiedOrBlockedUser(fetchedUser);
      if (unverifiedOrBlockedResponse) {
        return unverifiedOrBlockedResponse;
      }

      if (!fetchedUser.googleId) {
        user = await this.updateUser(fetchedUser, data, refreshToken);
      } else {
        const updateData: Partial<T> = {
          refreshToken,
        } as Partial<T>;
        user = await this.userRepository.updateById(fetchedUser.id, updateData);
      }
    }

    if (!user) {
      return {
        statusCode: 400,
        success: false,
        message: "User can't be created",
      };
    }

    return this.generateResponse(user, googleData.role);
  }
}

export default GoogleSignupUseCase;
