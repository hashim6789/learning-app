// import { Request, Response, NextFunction } from "express";

// //imported dtos for check the body credentials
// import { LoginDTO } from "../../shared/dtos/LoginDTO";

// //imported the entities
// import { Admin } from "../../application/entities/Admin";

// //imported the repositories
// import AdminRepository from "../../infrastructures/database/repositories/AdminRepository";

// //imported the use cases
// import AdminLoginUseCase from "../../application/use_cases/admin/AdminLoginUseCase";
// import AdminLogoutUseCase from "../../application/use_cases/admin/AdminLogoutUseCase";

// //created the instances
// const adminRepository = new AdminRepository();
// const adminLoginUseCase = new AdminLoginUseCase(adminRepository);
// const adminLogoutUseCase = new AdminLogoutUseCase(adminRepository);

// class AdminAuthController {
//   //this method for admin login
//   async AdminLogin(req: Request, res: Response, next: NextFunction) {
//     const loginDTO: LoginDTO = req.body;
//     try {
//       const response = await adminLoginUseCase.execute(loginDTO);

//       if (response.success && response.data) {
//         const { accessToken, refreshToken, admin } = response.data as {
//           accessToken: string;
//           refreshToken: string;
//           admin: Admin;
//         };

//         // Set refresh token as an HTTP-only cookie
//         res.cookie("accessToken", accessToken, { httpOnly: false });
//         res.cookie("refreshToken", refreshToken, { httpOnly: true });
//         res.cookie("user", "admin", { httpOnly: true });

//         res.status(200).json({
//           success: true,
//           message: response.message,
//           user: "admin",
//           data: admin,
//         });
//       } else {
//         res.status(400).json({ success: false, message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }

//   //this method for admin logout
//   async AdminLogout(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { refreshToken } = req.cookies;
//       const response = await adminLogoutUseCase.execute(refreshToken);

//       if (response.success && response.data) {
//         const { admin } = response.data as {
//           admin: Admin;
//         };
//         res.cookie("refreshToken", "", { httpOnly: true });
//         res.cookie("accessToken", "", { httpOnly: false });
//         res.cookie("user", "", { httpOnly: true });
//         res.status(200).json({
//           success: true,
//           message: response.message,
//           user: "admin",
//         });
//       } else {
//         res.status(response.statusCode).json({ message: response.message });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// export default AdminAuthController;
