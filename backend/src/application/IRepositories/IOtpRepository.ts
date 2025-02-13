import { Otp } from "../entities/Otp";

export interface IOtpRepository {
  deleteOtpByUserId(userId: string): Promise<number>;
  findOtpByUserId(userId: string): Promise<Otp | null>;
  createOtp(data: Otp): Promise<Otp | null>;
}
