// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";
// import bcrypt from "bcryptjs";
// import { IOtpRepository } from "../../IRepositories/IOtpRepository";
// import { validateData } from "../../../shared/helpers/validateHelper";
// import { OtpDTO } from "../../../shared/dtos/OtpDTO";

// class VerifyLearnerUseCase {
//   private learnerRepository: ILearnerRepository;
//   private otpRepository: IOtpRepository;
//   constructor(
//     learnerRepository: ILearnerRepository,
//     otpRepository: IOtpRepository
//   ) {
//     this.learnerRepository = learnerRepository;
//     this.otpRepository = otpRepository;
//   }

//   async execute(otpData: OtpDTO, learnerId: string): Promise<ResponseModel> {
//     try {
//       await validateData(otpData, OtpDTO);
//       const existingOtp = await this.otpRepository.findOtpByUseId(learnerId);
//       if (!existingOtp) {
//         return {
//           statusCode: 404,
//           success: false,
//           message: "The otp is doesn't exist",
//         };
//       }

//       if (existingOtp.expiresIn + 5 * 60 * 1000 > Date.now()) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The otp is expired!",
//         };
//       }

//       if (!(await bcrypt.compare(otpData.otp, existingOtp.otp))) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The otp is not valid!",
//         };
//       }

//       const verifiedLearner = await this.learnerRepository.verifyLearner(
//         learnerId
//       );

//       if (!verifiedLearner) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The learner cannot be verified",
//         };
//       }

//       verifiedLearner.removeSensitive();

//       return {
//         statusCode: 200,
//         success: true,
//         message: "The otp is verified successfully",
//         data: { learner: verifiedLearner },
//       };
//     } catch (error) {
//       throw new Error("An error when the otp is verified.");
//     }
//   }
// }

// export default VerifyLearnerUseCase;
