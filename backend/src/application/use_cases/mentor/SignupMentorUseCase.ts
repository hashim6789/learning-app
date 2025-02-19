// import bcrypt from "bcryptjs";
// import { SignupDTO } from "../../../shared/dtos/SignupDTO";
// import { validateData } from "../../../shared/helpers/validateHelper";
// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { IMentorRepository } from "../../IRepositories/IMentorRepository";
// import { Mentor } from "../../entities/Mentor";
// import { generateAccessToken } from "../../../shared/utils/jwt";
// import { generateRefreshToken } from "../../../shared/utils/uuid";
// import generateOtp from "../../../shared/utils/otp";
// import { sendOtpEmail } from "../../../shared/utils/mail";
// import { Otp } from "../../entities/Otp";
// import { IOtpRepository } from "../../IRepositories/IOtpRepository";

// class SignupMentorUseCase {
//   private mentorRepository: IMentorRepository;
//   private otpRepository: IOtpRepository;

//   constructor(
//     mentorRepository: IMentorRepository,
//     otpRepository: IOtpRepository
//   ) {
//     this.mentorRepository = mentorRepository;
//     this.otpRepository = otpRepository;
//   }

//   async execute(data: SignupDTO): Promise<ResponseModel> {
//     await validateData(data, SignupDTO);

//     const existingMentor = await this.mentorRepository.findByEmail(data.email);

//     if (existingMentor) {
//       if (!existingMentor.isVerified) {
//         await this.mentorRepository.deleteMentorById(existingMentor.id);
//         console.log("deleted user");
//       } else {
//         return {
//           statusCode: 400,
//           success: false,
//           message: "The mentor already exists",
//         };
//       }
//     }

//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     const refreshToken = generateRefreshToken();

//     const mentor = new Mentor(
//       null,
//       "",
//       data.firstName,
//       data.lastName || null,
//       data.email,
//       hashedPassword,
//       null,
//       [],
//       [],
//       false,
//       false,
//       refreshToken,
//       null
//     );

//     const createdMentor = await this.mentorRepository.createMentor(mentor);

//     if (!createdMentor) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The mentor creation failed!",
//       };
//     }
//     const accessToken = generateAccessToken({
//       userId: createdMentor.id,
//       role: "mentor",
//     });

//     const otp = generateOtp();
//     console.log(otp, "otp");
//     const hashedOtp = await bcrypt.hash(otp, 10);

//     const otpEntity = new Otp("", createdMentor.id, hashedOtp, Date.now());

//     const createdOtp = await this.otpRepository.createOtp(otpEntity);

//     if (!createdOtp) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The otp can't be set to the db",
//       };
//     }

//     const isSended = await sendOtpEmail(createdMentor.email, otp);
//     if (!isSended) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "The mail is not sent!",
//       };
//     }

//     createdMentor.removeSensitive();

//     return {
//       statusCode: 200,
//       success: true,
//       message: "Mentor signed up successfully",
//       data: {
//         accessToken,
//         refreshToken,
//         mentor: createdMentor,
//       },
//     };
//   }
// }

// export default SignupMentorUseCase;
