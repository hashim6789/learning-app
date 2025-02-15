// import MentorModel from "../../../infrastructures/database/models/MentorModel";
// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { LoginDTO } from "../../../shared/dtos/LoginDTO";
// import { validateData } from "../../../shared/helpers/validateHelper";
// import { IMentorRepository } from "../../IRepositories/IMentorRepository";
// import { generateAccessToken } from "../../../shared/utils/jwt";
// import bcrypt from "bcryptjs";
// import { generateRefreshToken } from "../../../shared/utils/uuid";

// class LoginMentorUseCase {
//   private mentorRepository;
//   constructor(mentorRepository: IMentorRepository) {
//     this.mentorRepository = mentorRepository;
//   }

//   async execute(data: LoginDTO): Promise<ResponseModel> {
//     await validateData(data, LoginDTO);
//     const existingMentor = await this.mentorRepository.findByEmail(data.email);
//     if (!existingMentor) {
//       return {
//         statusCode: 404,
//         success: false,
//         message: "The mentor is doesn't exist!",
//       };
//     }

//     if (existingMentor.isBlocked) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The mentor is blocked!",
//       };
//     }
//     if (!existingMentor.isVerified) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The mentor is not verified can you re-register!",
//       };
//     }

//     const isPasswordValid = await bcrypt.compare(
//       data.password,
//       existingMentor.password as string
//     );
//     if (!isPasswordValid) {
//       return {
//         statusCode: 401,
//         success: false,
//         message: "Invalid credentials or blocked!",
//       };
//     }

//     const accessToken = generateAccessToken({
//       userId: existingMentor.id,
//       role: "mentor",
//     });
//     const refreshToken = generateRefreshToken();

//     const refreshedMentor = await this.mentorRepository.setRefreshToken(
//       existingMentor.id,
//       refreshToken
//     );

//     if (!refreshedMentor) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The refreshed token can't be set.",
//       };
//     }

//     refreshedMentor.removeSensitive();

//     return {
//       statusCode: 200,
//       success: true,
//       message: "Mentor login successful",
//       data: {
//         accessToken,
//         refreshToken,
//         mentor: refreshedMentor,
//       },
//     };
//   }
// }

// export default LoginMentorUseCase;
