// // usecases/RefreshTokenUseCase.ts
// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { IMentorRepository } from "../../IRepositories/IMentorRepository";
// import {
//   generateAccessToken,

// } from "../../../shared/utils/jwt";

// class RefreshTokenUseCase {
//   private mentorRepository: IMentorRepository;

//   constructor(mentorRepository: IMentorRepository) {
//     this.mentorRepository = mentorRepository;
//   }

//   async execute(refreshToken: string): Promise<ResponseModel> {
//     const decoded = verifyRefreshToken(refreshToken);

//     if (!decoded) {
//       return {
//         statusCode: 403,
//         success: false,
//         message: "Invalid or expired refresh token",
//       };
//     }

//     const mentor = await this.mentorRepository.findByEmail(decoded.userId);

//     if (!mentor || mentor.refreshToken !== refreshToken) {
//       return {
//         statusCode: 403,
//         success: false,
//         message: "Refresh token is not valid",
//       };
//     }

//     const newAccessToken = generateAccessToken({
//       userId: mentor.id,
//       role: "mentor",
//     });

//     return {
//       statusCode: 200,
//       success: true,
//       message: "New access token generated",
//       data: newAccessToken,
//     };
//   }
// }

// export default RefreshTokenUseCase;
