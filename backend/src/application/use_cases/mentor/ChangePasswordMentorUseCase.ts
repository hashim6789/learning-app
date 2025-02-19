// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { sendForgotPasswordMail } from "../../../shared/utils/mail";
// import { IMentorRepository } from "../../IRepositories/IMentorRepository";
// import { verifyAccessToken as verifyToken } from "../../../shared/utils/jwt";
// import { LoginDTO } from "../../../shared/dtos/LoginDTO";
// import { validateData } from "../../../shared/helpers/validateHelper";
// import { ChangePasswordDTO } from "../../../shared/dtos/ChangePasswordDTO";

// import bcrypt from "bcryptjs";

// class ChangePasswordMentorUseCase {
//   private mentorRepository: IMentorRepository;
//   constructor(mentorRepository: IMentorRepository) {
//     this.mentorRepository = mentorRepository;
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
//       const existingMentor = await this.mentorRepository.fetchMentorById(
//         decodedData.userId
//       );
//       if (!existingMentor) {
//         return {
//           statusCode: 404,
//           success: false,
//           message: "no mentor exist in this email!",
//         };
//       }

//       if (existingMentor.resetToken !== token) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "this is not a valid token",
//         };
//       }

//       const hashedPassword = await bcrypt.hash(data.password, 10);
//       const updatedMentor = await this.mentorRepository.updateMentor(
//         existingMentor.id,
//         { resetToken: null, password: hashedPassword }
//       );
//       if (!updatedMentor) {
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
//           mentor: updatedMentor,
//         },
//       };
//     } catch (error) {
//       throw new Error("An error when forgot password generating!");
//     }
//   }
// }

// export default ChangePasswordMentorUseCase;
