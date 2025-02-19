// import { Request, Response, NextFunction } from "express";

// //imported dtos for check the body credentials
// import { SignupDTO } from "../../shared/dtos/SignupDTO";
// import { LoginDTO } from "../../shared/dtos/LoginDTO";
// import { OtpDTO } from "../../shared/dtos/OtpDTO";

// //imported the entities
// import { Learner } from "../../application/entities/Learner";

// //imported the repositories
// import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
// import OtpRepository from "../../infrastructures/database/repositories/OtpRepository";

// //imported the use cases
// // import SignupLearnerUseCase from "../../application/use_cases/learner/SignupLearnerUseCase";
// import LoginLearnerUseCase from "../../application/use_cases/learner/LoginLearnerUseCase";
// // import GoogleSignupUseCase from "../../../application/use_cases/learner/GoogleSignupLearnerUseCase";
// import LogoutLearnerUseCase from "../../application/use_cases/learner/LogoutLearnerUseCase";
// import GoogleSignupLearnerUseCase from "../../application/use_cases/learner/GoogleSignupLearnerUseCase";
// import VerifyLearnerUseCase from "../../application/use_cases/learner/VerifyLearnerUseCase";
// import ResendOtpLearnerUseCase from "../../application/use_cases/learner/ResendOtpLearnerUseCase";
// import ForgotPasswordLearnerUseCase from "../../application/use_cases/learner/ForgotPasswordLearnerUseCase";
// import GetChangePasswordLearnerUseCase from "../../application/use_cases/learner/GetChangePasswordLearnerUseCase";
// import ChangePasswordLearnerUseCase from "../../application/use_cases/learner/ChangePasswordLearnerUseCase";

// //created the instances
// const learnerRepository = new LearnerRepository();
// const otpRepository = new OtpRepository();
// // const signupLearnerUseCase = new SignupLearnerUseCase(
// //   learnerRepository,
// //   otpRepository
// // );
// const loginLearnerUseCase = new LoginLearnerUseCase(learnerRepository);
// const googleSignupLearnerUseCase = new GoogleSignupLearnerUseCase(
//   learnerRepository
// );
// const logoutLearnerUseCase = new LogoutLearnerUseCase(learnerRepository);
// const verifyLearnerUseCase = new VerifyLearnerUseCase(
//   learnerRepository,
//   otpRepository
// );
// const resendOtpLearnerUseCase = new ResendOtpLearnerUseCase(
//   learnerRepository,
//   otpRepository
// );

// const forgotPasswordForLearner = new ForgotPasswordLearnerUseCase(
//   learnerRepository
// );

// const getChangePasswordLearnerUseCase = new GetChangePasswordLearnerUseCase(
//   learnerRepository
// );

// const changePasswordLearnerUseCase = new ChangePasswordLearnerUseCase(
//   learnerRepository
// );

// //learner controller
// class LearnerAuthController {
//   constructor() {}

//   learner signup
//   async learnerSignup(req: Request, res: Response, next: NextFunction) {
//     const signupDTO: SignupDTO = req.body;
//     try {
//       const response = await signupLearnerUseCase.execute(signupDTO);
//       if (response.success && response.data) {
//         const { accessToken, refreshToken, learner } = response.data as {
//           accessToken: string;
//           refreshToken: string;
//           learner: Learner;
//         };

//         res.cookie("refreshToken", refreshToken, { httpOnly: true });
//         res.cookie("accessToken", accessToken, { httpOnly: false });
//         res.cookie("user", "learner", { httpOnly: true });

//         res.status(200).json({
//           message: response.message,
//           user: "learner",
//           data: learner,
//         });
//       } else {
//         res.status(400).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }

//   //learner otp verification
//   async learnerOtpVerification(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     const learnerId = req.user?.userId || "";
//     try {
//       const response = await verifyLearnerUseCase.execute(req.body, learnerId);
//       if (response.success && response.data) {
//         const { learner } = response.data as {
//           learner: Learner;
//         };
//         // Send access token in response
//         res.status(200).json({
//           message: response.message,
//           data: learner,
//           user: "learner",
//         });
//       } else {
//         res.status(400).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }

//   //learner resend otp
//   async learnerResendOtp(req: Request, res: Response, next: NextFunction) {
//     const learnerId = req.user?.userId || "";
//     try {
//       const response = await resendOtpLearnerUseCase.execute(learnerId);

//       if (response.success && response.data) {
//         res.status(200).json({
//           message: response.message,
//           user: "learner",
//         });
//       } else {
//         res.status(400).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }

//   //learner login
//   async learnerLogin(req: Request, res: Response, next: NextFunction) {
//     const loginDTO: LoginDTO = req.body;
//     try {
//       const response = await loginLearnerUseCase.execute(loginDTO);
//       if (response.success && response.data) {
//         const { accessToken, refreshToken, learner } = response.data as {
//           accessToken: string;
//           refreshToken: string;
//           learner: Learner;
//         };

//         res.cookie("refreshToken", refreshToken, { httpOnly: true });
//         res.cookie("accessToken", accessToken, { httpOnly: false });
//         res.cookie("user", "learner", { httpOnly: true });

//         // Send access token in response
//         res.status(200).json({
//           message: response.message,
//           data: learner,
//           user: "learner",
//         });
//       } else {
//         res.status(400).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
//   async learnerLogout(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { refreshToken } = req.cookies;
//       const learnerId = req.user?.userId || "";
//       const response = await logoutLearnerUseCase.execute(learnerId);
//       if (response.success && response.data) {
//         res.cookie("refreshToken", "", { httpOnly: true });
//         res.cookie("accessToken", "", { httpOnly: false });
//         res.cookie("user", "", { httpOnly: true });
//       }
//       res.status(response.statusCode).json({ message: response.message });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async learnerGoogleSignup(req: Request, res: Response, next: NextFunction) {
//     const { token }: { token: string } = req.body;
//     try {
//       const response = await googleSignupLearnerUseCase.execute(token);

//       if (response.success && response.data) {
//         const { accessToken, refreshToken, learner } = response.data as {
//           accessToken: string;
//           refreshToken: string;
//           learner: Learner;
//         };

//         res.cookie("refreshToken", refreshToken, { httpOnly: true });
//         res.cookie("accessToken", accessToken, { httpOnly: false });
//         res.cookie("user", "learner", { httpOnly: true });

//         res.status(200).json({
//           message: response.message,
//           user: "learner",
//           data: learner,
//         });

//         // Send access token in response
//       } else {
//         res.status(400).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }

//   //learner forgot password
//   async forgotPasswordForLearner(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     const { email } = req.body;
//     try {
//       const response = await forgotPasswordForLearner.execute(email);
//       if (response.success && response.data) {
//         const { learner } = response.data as {
//           learner: Learner;
//         };
//         res.status(200).json({
//           message: response.message,
//           data: learner,
//           user: "learner",
//         });
//       } else {
//         res.status(400).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }

//   //learner get the change password
//   async getChangePasswordLearner(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     const { token } = req.params;
//     try {
//       const response = await getChangePasswordLearnerUseCase.execute(token);
//       if (response.success && response.data) {
//         const { resetToken } = response.data as {
//           resetToken: string;
//         };

//         //set the reset token in cookie
//         res.cookie("resetToken", resetToken, { httpOnly: true });

//         res.status(200).json({
//           message: response.message,
//           user: "learner",
//         });
//       } else {
//         res.status(400).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }

//   //learner change password
//   async changePasswordLearner(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { resetToken } = req.cookies;
//       const response = await changePasswordLearnerUseCase.execute(
//         resetToken,
//         req.body
//       );
//       if (response.success && response.data) {
//         //removed the cookie
//         res.cookie("resetToken", "", { httpOnly: true });
//         res.status(200).json({
//           message: response.message,
//           user: "learner",
//         });
//       } else {
//         res.status(400).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// export default LearnerAuthController;
