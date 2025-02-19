// import { ResponseModel } from "../../../shared/types/ResponseModel";

// //imported the interfaces
// import { IAdminRepository } from "../../IRepositories/IAdminRepository";

// //imported dtos for check the body credentials
// import { LoginDTO } from "../../../shared/dtos/LoginDTO";

// //import the utility methods
// import { generateAccessToken } from "../../../shared/utils/jwt";
// import { generateRefreshToken } from "../../../shared/utils/uuid";
// import { validateData } from "../../../shared/helpers/validateHelper";

// class AdminLoginUseCase {
//   private adminRepository;
//   constructor(adminRepository: IAdminRepository) {
//     this.adminRepository = adminRepository;
//   }

//   async execute(data: LoginDTO): Promise<ResponseModel> {
//     await validateData(data, LoginDTO);

//     const admin = await this.adminRepository.fetchByEmail(data.email);
//     if (!admin || admin.password !== data.password) {
//       return {
//         statusCode: 404,
//         success: false,
//         message: "The admin doesn't exist or invalid credentials!",
//       };
//     }

//     const accessToken = generateAccessToken({
//       userId: admin.id,
//       role: "admin",
//     });

//     const refreshToken = generateRefreshToken();

//     const refreshedAdmin = await this.adminRepository.setRefreshTokenToDB(
//       refreshToken,
//       admin.id
//     );

//     if (!refreshedAdmin) {
//       return {
//         success: false,
//         statusCode: 400,
//         message: "an error happened when the set the refresh token!",
//       };
//     }

//     refreshedAdmin.removeSensitive();

//     return {
//       statusCode: 200,
//       success: true,
//       message: "Login successful",
//       data: {
//         accessToken,
//         refreshToken,
//         admin: refreshedAdmin,
//       },
//     };
//   }
// }

// export default AdminLoginUseCase;
