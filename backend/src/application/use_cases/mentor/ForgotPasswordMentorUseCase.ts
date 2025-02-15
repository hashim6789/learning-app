// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { sendForgotPasswordMail } from "../../../shared/utils/mail";
// import { IMentorRepository } from "../../IRepositories/IMentorRepository";
// import { generateAccessToken as generateToken } from "../../../shared/utils/jwt";

// class ForgotPasswordMentorUseCase {
//   private mentorRepository: IMentorRepository;
//   constructor(mentorRepository: IMentorRepository) {
//     this.mentorRepository = mentorRepository;
//   }

//   async execute(email: string): Promise<ResponseModel> {
//     try {
//       const existingMentor = await this.mentorRepository.findByEmail(email);
//       if (!existingMentor) {
//         return {
//           statusCode: 404,
//           success: false,
//           message: "no mentor exist in this email!",
//         };
//       }

//       const resetToken = generateToken({
//         userId: existingMentor.id,
//         role: "mentor",
//       });

//       const tokenSetMentor = await this.mentorRepository.updateMentor(
//         existingMentor.id,
//         { resetToken }
//       );

//       if (!tokenSetMentor) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The reset token cannot be set",
//         };
//       }
//       const isSended = await sendForgotPasswordMail(
//         "mentor",
//         existingMentor,
//         resetToken
//       );
//       if (!isSended) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The forgot password cannot be sent",
//         };
//       }

//       existingMentor.removeSensitive();

//       return {
//         statusCode: 200,
//         success: true,
//         message: "The forgot password sent successfully",
//         data: {
//           mentor: existingMentor,
//         },
//       };
//     } catch (error) {
//       throw new Error("An error when forgot password generating!");
//     }
//   }
// }

// export default ForgotPasswordMentorUseCase;
