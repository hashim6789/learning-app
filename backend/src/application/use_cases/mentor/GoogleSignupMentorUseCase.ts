import { User } from "../../../shared/types/User";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import axios from "axios";
import { generateAccessToken } from "../../../shared/utils/jwt";
import { BankDetail, Mentor } from "../../entities/Mentor";
import { generateRefreshToken } from "../../../shared/utils/uuid";

class GoogleSignupMentorUseCase {
  private mentorRepository;
  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(token: string) {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    let fetchedUser = await this.mentorRepository.findByGoogleId(data.sub);
    console.log("user 3 :", fetchedUser);
    if (!fetchedUser) {
      fetchedUser = await this.mentorRepository.findByEmail(data.email);
    }
    console.log("user 2 :", fetchedUser);

    if (!fetchedUser) {
      const googleId = data.sub;
      const firstName = data.given_name;
      const lastName = data.family_name || null;
      const email = data.email;
      const profilePicture = data.picture || null;
      const isBlocked = false;

      const newLearner = new Mentor(
        "",
        googleId,
        firstName,
        lastName,
        email,
        profilePicture,
        [],
        [],
        isBlocked,
        null,
        null,
        null,
        null
      );
      fetchedUser = await this.mentorRepository.createMentor(newLearner);
    }

    console.log("New User Created:", fetchedUser);

    if (fetchedUser.isBlocked) {
      return {
        statusCode: 403,
        success: false,
        message: "invalid credentials or blocked!",
      };
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: fetchedUser.id,
      role: "mentor",
    });
    const refreshToken = generateRefreshToken();

    const tokenSetMentor = await this.mentorRepository.setRefreshToken(
      fetchedUser.id,
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
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        mentor: tokenSetMentor,
      },
    };
  }
}

export default GoogleSignupMentorUseCase;
