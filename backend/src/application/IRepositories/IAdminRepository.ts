import { Admin } from "../entities/Admin";

export interface IAdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
  setRefreshTokenToDB(token: string, adminId: string): Promise<Admin | null>;
  findByRefreshToken(token: string): Promise<Admin | null>;
  deleteRefreshToken(adminId: string): Promise<Admin | null>;
}
