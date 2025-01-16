import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import axios from "axios";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt";
import { Learner } from "../../entities/Learner";

class GoogleSignupLearnerUseCase {
  private learnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(token: string) {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    let fetchedUser = await this.learnerRepository.findByGoogleId(data.sub);
    console.log("user 1 :", fetchedUser);
    if (!fetchedUser) {
      fetchedUser = await this.learnerRepository.findByEmail(data.email);
    }
    console.log("user 2 :", fetchedUser);

    if (!fetchedUser) {
      const googleId = data.sub;
      const firstName = data.given_name;
      const lastName = data.family_name || null;
      const email = data.email;
      const profilePicture = data.picture || null;
      const isBlocked = false;

      const newLearner = new Learner(
        googleId,
        "",
        firstName,
        lastName,
        email,
        null, // password
        profilePicture,
        [], // purchasedCourses
        isBlocked
      );
      fetchedUser = await this.learnerRepository.createLearner(newLearner);
    }

    console.log("New User Created:", fetchedUser);

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: fetchedUser.id,
      role: "learner",
    });
    const refreshToken = generateRefreshToken({
      userId: fetchedUser.id,
      role: "learner",
    });

    return {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export default GoogleSignupLearnerUseCase;
