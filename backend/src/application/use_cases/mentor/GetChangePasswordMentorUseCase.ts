// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { sendForgotPasswordMail } from "../../../shared/utils/mail";
// import { IMentorRepository } from "../../IRepositories/IMentorRepository";
// import { verifyAccessToken as verifyToken } from "../../../shared/utils/jwt";

// class GetChangePasswordMentorUseCase {
//   private mentorRepository: IMentorRepository;
//   constructor(mentorRepository: IMentorRepository) {
//     this.mentorRepository = mentorRepository;
//   }

//   async execute(token: string): Promise<ResponseModel> {
//     try {
//       const decodedData = verifyToken(token);
//       if (!decodedData || decodedData.role !== "mentor") {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "no token is expired or not valid",
//         };
//       }

//       const existingMentor = await this.mentorRepository.fetchMentorById(
//         decodedData.userId
//       );
//       if (!existingMentor) {
//         return {
//           statusCode: 404,
//           success: false,
//           message: "no mentor doesn't exist!",
//         };
//       }

//       if (existingMentor.resetToken !== token) {
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
//           resetToken: existingMentor.resetToken,
//         },
//       };
//     } catch (error) {
//       throw new Error("An error when forgot password generating!");
//     }
//   }
// }

// export default GetChangePasswordMentorUseCase;
