// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { LoginDTO } from "../../../shared/dtos/LoginDTO";
// import { validateData } from "../../../shared/helpers/validateHelper";
// import { IAdminRepository } from "../../IRepositories/IAdminRepository";

// import { generateAccessToken } from "../../../shared/utils/jwt";
// import { generateRefreshToken } from "../../../shared/utils/uuid";

// class AdminLogoutUseCase {
//   private adminRepository;
//   constructor(adminRepository: IAdminRepository) {
//     this.adminRepository = adminRepository;
//   }

//   async execute(refreshToken: string): Promise<ResponseModel> {
//     const admin = await this.adminRepository.fetchByRefreshToken(refreshToken);
//     if (!admin) {
//       return {
//         statusCode: 404,
//         success: false,
//         message: "The admin doesn't exist!",
//       };
//     }

//     const unRefreshedAdmin = await this.adminRepository.deleteRefreshToken(
//       admin.id
//     );
//     if (!unRefreshedAdmin) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "some thing wrong when deleting the refreshToken!",
//       };
//     }

//     unRefreshedAdmin.removeSensitive();

//     return {
//       statusCode: 200,
//       success: true,
//       message: "Logout successful",
//       data: {
//         admin: unRefreshedAdmin,
//       },
//     };
//   }
// }

// export default AdminLogoutUseCase;
