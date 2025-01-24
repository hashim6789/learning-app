// import crypto from "crypto";
// import bcrypt from "bcryptjs";
// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
// import { sendOtpEmail } from "../../../shared/utils/nodemailer";

// class LearnerForgotPasswordUseCase {
//   private learnerRepository: ILearnerRepository;

//   constructor(learnerRepository: ILearnerRepository) {
//     this.learnerRepository = learnerRepository;
//   }

//   async execute(email: string): Promise<ResponseModel> {
//     try {
//       const existingLearner = await this.learnerRepository.findByEmail(email);

//       if (!existingLearner) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The learner doesn't exist.",
//         };
//       }

//       // Generate secure reset token and expiry
//       const token = crypto.randomUUID();
//       const hashedToken = await bcrypt.hash(token, 10);

//       // Save token and expiry to learner record
//       existingLearner.resetToken = hashedToken;
//       existingLearner.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiration
//       // await this.learnerRepository.updateLearner(existingLearner);

//       // Send email with the reset link
//       const resetLink = `${process.env.DOMAIN_NAME}/auth/reset-password/${token}`;
//       await sendOtpEmail(email, resetLink);

//       return {
//         statusCode: 200,
//         success: true,
//         message: "Password reset email sent successfully.",
//       };
//     } catch (error) {
//       console.error("Error in forgot password use case:", error);
//       return {
//         statusCode: 500,
//         success: false,
//         message: "An error occurred while processing your request.",
//       };
//     }
//   }
// }

// export default LearnerForgotPasswordUseCase;
