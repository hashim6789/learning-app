// import LearnerModel from "../../../infrastructures/database/models/LearnerModel";
// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { LoginDTO } from "../../../shared/dtos/LoginDTO";
// import { validateData } from "../../../shared/helpers/validateHelper";
// import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
// import { generateAccessToken } from "../../../shared/utils/jwt";
// import bcrypt from "bcryptjs";
// import { generateRefreshToken } from "../../../shared/utils/uuid";

// class LoginLearnerUseCase {
//   private learnerRepository;
//   constructor(learnerRepository: ILearnerRepository) {
//     this.learnerRepository = learnerRepository;
//   }

//   async execute(data: LoginDTO): Promise<ResponseModel> {
//     await validateData(data, LoginDTO);
//     const existingLearner = await this.learnerRepository.findByEmail(
//       data.email
//     );
//     if (!existingLearner) {
//       return {
//         statusCode: 404,
//         success: false,
//         message: "The learner is doesn't exist!",
//       };
//     }

//     if (existingLearner.isBlocked) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The learner is blocked!",
//       };
//     }
//     if (!existingLearner.isVerified) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The learner is not verified can you re-register!",
//       };
//     }

//     const isPasswordValid = await bcrypt.compare(
//       data.password,
//       existingLearner.password as string
//     );
//     if (!isPasswordValid) {
//       return {
//         statusCode: 401,
//         success: false,
//         message: "Invalid credentials or blocked!",
//       };
//     }

//     const accessToken = generateAccessToken({
//       userId: existingLearner.id,
//       role: "learner",
//     });
//     const refreshToken = generateRefreshToken();

//     const refreshedLearner = await this.learnerRepository.setRefreshToken(
//       existingLearner.id,
//       refreshToken
//     );

//     if (!refreshedLearner) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The refreshed token can't be set.",
//       };
//     }

//     refreshedLearner.removeSensitive();

//     return {
//       statusCode: 200,
//       success: true,
//       message: "Learner login successful",
//       data: {
//         accessToken,
//         refreshToken,
//         learner: refreshedLearner,
//       },
//     };
//   }
// }

// export default LoginLearnerUseCase;
