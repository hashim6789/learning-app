import { ResponseModel } from "../../../shared/types/ResponseModel";
import { sendForgotPasswordMail } from "../../../shared/utils/mail";
import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
import { generateAccessToken as generateToken } from "../../../shared/utils/jwt";

class ForgotPasswordLearnerUseCase {
  private learnerRepository: ILearnerRepository;
  constructor(learnerRepository: ILearnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async execute(email: string): Promise<ResponseModel> {
    try {
      const existingLearner = await this.learnerRepository.findByEmail(email);
      if (!existingLearner) {
        return {
          statusCode: 404,
          success: false,
          message: "no learner exist in this email!",
        };
      }

      const resetToken = generateToken({
        userId: existingLearner.id,
        role: "learner",
      });

      const tokenSetLearner = await this.learnerRepository.updateLearner(
        existingLearner.id,
        { resetToken }
      );

      if (!tokenSetLearner) {
        return {
          statusCode: 400,
          success: false,
          message: "The reset token cannot be set",
        };
      }
      const isSended = await sendForgotPasswordMail(
        existingLearner,
        resetToken
      );
      if (!isSended) {
        return {
          statusCode: 400,
          success: false,
          message: "The forgot password cannot be sent",
        };
      }

      existingLearner.removeSensitive();

      return {
        statusCode: 200,
        success: true,
        message: "The forgot password sent successfully",
        data: {
          learner: existingLearner,
        },
      };
    } catch (error) {
      throw new Error("An error when forgot password generating!");
    }
  }
}

export default ForgotPasswordLearnerUseCase;
