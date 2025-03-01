// application/IRepositories/IAdminRepository.ts
import { IUserRepository } from "./IUserRepository";
import { Admin } from "../../../../application/entities/admin.entity";

export interface IAdminRepository extends IUserRepository<Admin> {}

// export interface IAdminRepository extends IUserRepository {
//   fetchById(adminId: string): Promise<Admin | null>;
//   fetchAll(): Promise<Admin[] | null>;
//   updateById(adminId: string, data: Partial<Admin>): Promise<Admin | null>;
//   deleteById(mentorId: string): Promise<Admin | null>;

// }

// fetchByEmail(email: string): Promise<Admin | null>;
// fetchByRefreshToken(token: string): Promise<Admin | null>;
// deleteRefreshToken(adminId: string): Promise<Admin | null>;
