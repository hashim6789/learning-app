import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import axios from "axios";
import { generateAccessToken } from "../../../shared/utils/jwt";
import { Learner } from "../../entities/Learner";
import { generateRefreshToken } from "../../../shared/utils/uuid";

class GoogleSignupLearnerUseCase {
  private learnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(token: string) {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    const fetchedLearner = await this.learnerRepository.findByEmail(data.email);
    const refreshToken = generateRefreshToken();

    let learner: Learner | null = null;
    if (!fetchedLearner) {
      const newLearner = new Learner(
        data.sub,
        "",
        data.given_name,
        data.family_name || null,
        data.email,
        null,
        data.picture || null,
        [],
        false,
        data.email_verified,
        refreshToken,
        null
      );
      learner = await this.learnerRepository.createLearner(newLearner);
    } else if (fetchedLearner.isBlocked) {
      return {
        statusCode: 400,
        success: false,
        message: "Learner is blocked!",
      };
    } else if (!fetchedLearner.isVerified) {
      return {
        statusCode: 400,
        success: false,
        message: "Learner is unverified!",
      };
    } else if (!fetchedLearner.googleId) {
      const updateData: Partial<Learner> = {
        googleId: data.sub,
        profilePicture: data.picture,
        isVerified: true,
        refreshToken,
      };

      learner = await this.learnerRepository.updateLearner(
        fetchedLearner.id,
        updateData
      );
    } else {
      learner = await this.learnerRepository.updateLearner(fetchedLearner.id, {
        refreshToken,
      });
    }

    if (!learner) {
      return {
        statusCode: 400,
        success: false,
        message: "Learner is can't be created",
      };
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: learner.id,
      role: "learner",
    });

    learner.removeSensitive();

    return {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        learner,
      },
    };
  }
}

export default GoogleSignupLearnerUseCase;
