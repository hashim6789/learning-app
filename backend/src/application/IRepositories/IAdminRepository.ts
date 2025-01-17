import { Admin } from "../entities/Admin";

export interface IAdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
  setRefreshTokenToDB(token: string, adminId: string): Promise<Admin | null>;
}
