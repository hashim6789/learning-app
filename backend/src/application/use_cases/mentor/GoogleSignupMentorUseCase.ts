// import { IMentorRepository } from "../../IRepositories/IMentorRepository";
// import axios from "axios";
// import { generateAccessToken } from "../../../shared/utils/jwt";
// import { Mentor } from "../../entities/Mentor";
// import { generateRefreshToken } from "../../../shared/utils/uuid";

// class GoogleSignupMentorUseCase {
//   private mentorRepository;
//   constructor(mentorRepository: IMentorRepository) {
//     this.mentorRepository = mentorRepository;
//   }

//   async execute(token: string) {
//     const { data } = await axios.get(
//       `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
//     );

//     const fetchedMentor = await this.mentorRepository.findByEmail(data.email);
//     const refreshToken = generateRefreshToken();

//     let mentor: Mentor | null = null;
//     if (!fetchedMentor) {
//       const newMentor = new Mentor(
//         data.sub,
//         "",
//         data.given_name,
//         data.family_name || null,
//         data.email,
//         null,
//         data.picture || null,
//         [],
//         [],
//         false,
//         data.email_verified,
//         refreshToken,
//         null
//       );
//       mentor = await this.mentorRepository.createMentor(newMentor);
//     } else if (fetchedMentor.isBlocked) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "Mentor is blocked!",
//       };
//     } else if (!fetchedMentor.isVerified) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "Mentor is unverified!",
//       };
//     } else if (!fetchedMentor.googleId) {
//       const updateData: Partial<Mentor> = {
//         googleId: data.sub,
//         profilePicture: data.picture,
//         isVerified: true,
//         refreshToken,
//       };

//       mentor = await this.mentorRepository.updateMentor(
//         fetchedMentor.id,
//         updateData
//       );
//     } else {
//       mentor = await this.mentorRepository.updateMentor(fetchedMentor.id, {
//         refreshToken,
//       });
//     }

//     if (!mentor) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "Mentor is can't be created",
//       };
//     }

//     // Generate tokens
//     const accessToken = generateAccessToken({
//       userId: mentor.id,
//       role: "mentor",
//     });

//     mentor.removeSensitive();

//     return {
//       statusCode: 200,
//       success: true,
//       message: "Login successful",
//       data: {
//         accessToken,
//         refreshToken,
//         mentor,
//       },
//     };
//   }
// }

// export default GoogleSignupMentorUseCase;
