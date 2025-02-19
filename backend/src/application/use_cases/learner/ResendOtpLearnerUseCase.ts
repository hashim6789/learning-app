// // usecases/SignupLearnerUseCase.ts
// import bcrypt from "bcryptjs";

// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";

// import generateOtp from "../../../shared/utils/otp";
// import { sendOtpEmail } from "../../../shared/utils/mail";
// import { IOtpRepository } from "../../IRepositories/IOtpRepository";
// import { Otp } from "../../entities/Otp";

// class ResendOtpLearnerUseCase {
//   private learnerRepository: ILearnerRepository;
//   private otpRepository: IOtpRepository;

//   constructor(
//     learnerRepository: ILearnerRepository,
//     otpRepository: IOtpRepository
//   ) {
//     this.learnerRepository = learnerRepository;
//     this.otpRepository = otpRepository;
//   }

//   async execute(learnerId: string): Promise<ResponseModel> {
//     try {
//       const otpCount = await this.otpRepository.deleteOtpByUserId(learnerId);
//       console.log("otp count =", otpCount);

//       const otp = generateOtp();
//       console.log(otp, "otp");
//       const hashedOtp = await bcrypt.hash(otp, 10);

//       const otpEntity = new Otp("", learnerId, hashedOtp, Date.now());

//       const createdOtp = await this.otpRepository.createOtp(otpEntity);

//       if (!createdOtp) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The otp can't be set to the db",
//         };
//       }

//       // console.log("otp =", createdOtp);
//       const learner = await this.learnerRepository.fetchLearnerById(learnerId);
//       if (!learner) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The learner is doesn't exist!",
//         };
//       }

//       const isSended = await sendOtpEmail(learner.email, otp);
//       if (!isSended) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The mail is not sent!",
//         };
//       }

//       return {
//         statusCode: 200,
//         success: true,
//         message: "Learner signed up successfully",
//         data: {
//           otp: createdOtp,
//         },
//       };
//     } catch (error) {
//       throw new Error("An error when the resend otp!");
//     }
//   }
// }

// export default ResendOtpLearnerUseCase;
