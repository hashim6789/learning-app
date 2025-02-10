import { Admin } from "../entities/Admin";

export interface IAdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
  findById(adminId: string): Promise<Admin | null>;
  setRefreshTokenToDB(adminId: string, token: string): Promise<Admin | null>;
  findByRefreshToken(token: string): Promise<Admin | null>;
  deleteRefreshToken(adminId: string): Promise<Admin | null>;
}
