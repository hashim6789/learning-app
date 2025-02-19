// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { sendForgotPasswordMail } from "../../../shared/utils/mail";
// import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
// import { verifyAccessToken as verifyToken } from "../../../shared/utils/jwt";

// class GetChangePasswordLearnerUseCase {
//   private learnerRepository: ILearnerRepository;
//   constructor(learnerRepository: ILearnerRepository) {
//     this.learnerRepository = learnerRepository;
//   }

//   async execute(token: string): Promise<ResponseModel> {
//     try {
//       const decodedData = verifyToken(token);
//       if (!decodedData || decodedData.role !== "learner") {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "no token is expired or not valid",
//         };
//       }

//       const existingLearner = await this.learnerRepository.fetchLearnerById(
//         decodedData.userId
//       );
//       if (!existingLearner) {
//         return {
//           statusCode: 404,
//           success: false,
//           message: "no learner doesn't exist!",
//         };
//       }

//       if (existingLearner.resetToken !== token) {
//         return {
//           statusCode: 404,
//           success: false,
//           message: "no reset token is not valid",
//         };
//       }

//       return {
//         statusCode: 200,
//         success: true,
//         message: "The change password page get successfully",
//         data: {
//           resetToken: existingLearner.resetToken,
//         },
//       };
//     } catch (error) {
//       throw new Error("An error when forgot password generating!");
//     }
//   }
// }

// export default GetChangePasswordLearnerUseCase;
