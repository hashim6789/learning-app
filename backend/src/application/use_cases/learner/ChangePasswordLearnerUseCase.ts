// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { sendForgotPasswordMail } from "../../../shared/utils/mail";
// import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
// import { verifyAccessToken as verifyToken } from "../../../shared/utils/jwt";
// import { LoginDTO } from "../../../shared/dtos/LoginDTO";
// import { validateData } from "../../../shared/helpers/validateHelper";
// import { ChangePasswordDTO } from "../../../shared/dtos/ChangePasswordDTO";

// import bcrypt from "bcryptjs";

// class ChangePasswordLearnerUseCase {
//   private learnerRepository: ILearnerRepository;
//   constructor(learnerRepository: ILearnerRepository) {
//     this.learnerRepository = learnerRepository;
//   }

//   async execute(
//     token: string,
//     data: ChangePasswordDTO
//   ): Promise<ResponseModel> {
//     try {
//       await validateData(data, ChangePasswordDTO);

//       const decodedData = verifyToken(token);
//       if (!decodedData) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "no token is expired",
//         };
//       }
//       const existingLearner = await this.learnerRepository.fetchLearnerById(
//         decodedData.userId
//       );
//       if (!existingLearner) {
//         return {
//           statusCode: 404,
//           success: false,
//           message: "no learner exist in this email!",
//         };
//       }

//       if (existingLearner.resetToken !== token) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "this is not a valid token",
//         };
//       }

//       const hashedPassword = await bcrypt.hash(data.password, 10);
//       const updatedLearner = await this.learnerRepository.updateLearner(
//         existingLearner.id,
//         { resetToken: null, password: hashedPassword }
//       );
//       if (!updatedLearner) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "failed the password update!",
//         };
//       }

//       return {
//         statusCode: 200,
//         success: true,
//         message: "The password reset successfully",
//         data: {
//           learner: updatedLearner,
//         },
//       };
//     } catch (error) {
//       throw new Error("An error when forgot password generating!");
//     }
//   }
// }

// export default ChangePasswordLearnerUseCase;
