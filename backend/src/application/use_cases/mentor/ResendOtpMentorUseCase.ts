// // usecases/SignupMentorUseCase.ts
// import bcrypt from "bcryptjs";

// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { IMentorRepository } from "../../IRepositories/IMentorRepository";

// import generateOtp from "../../../shared/utils/otp";
// import { sendOtpEmail } from "../../../shared/utils/mail";
// import { IOtpRepository } from "../../IRepositories/IOtpRepository";
// import { Otp } from "../../entities/Otp";

// class ResendOtpMentorUseCase {
//   private mentorRepository: IMentorRepository;
//   private otpRepository: IOtpRepository;

//   constructor(
//     mentorRepository: IMentorRepository,
//     otpRepository: IOtpRepository
//   ) {
//     this.mentorRepository = mentorRepository;
//     this.otpRepository = otpRepository;
//   }

//   async execute(mentorId: string): Promise<ResponseModel> {
//     try {
//       const otpCount = await this.otpRepository.deleteOtpByUserId(mentorId);
//       console.log("otp count =", otpCount);

//       const otp = generateOtp();
//       console.log(otp, "otp");
//       const hashedOtp = await bcrypt.hash(otp, 10);

//       const otpEntity = new Otp("", mentorId, hashedOtp, Date.now());

//       const createdOtp = await this.otpRepository.createOtp(otpEntity);

//       if (!createdOtp) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The otp can't be set to the db",
//         };
//       }

//       // console.log("otp =", createdOtp);
//       const mentor = await this.mentorRepository.fetchMentorById(mentorId);
//       if (!mentor) {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The mentor is doesn't exist!",
//         };
//       }

//       const isSended = await sendOtpEmail(mentor.email, otp);
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
//         message: "Mentor signed up successfully",
//         data: {
//           otp: createdOtp,
//         },
//       };
//     } catch (error) {
//       throw new Error("An error when the resend otp!");
//     }
//   }
// }

// export default ResendOtpMentorUseCase;
