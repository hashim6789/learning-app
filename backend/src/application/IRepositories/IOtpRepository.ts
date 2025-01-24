import { Otp } from "../entities/Otp";

export interface IOtpRepository {
  //   setRefreshTokenToDB(otpId: string, token: string): Promise<Otp | null>;
  //   findByRefreshToken(token: string): Promise<Otp | null>;
  deleteOtpByUserId(userId: string): Promise<number>;
  findOtpByUseId(userId: string): Promise<Otp | null>;
  createOtp(data: Otp): Promise<Otp | null>;
}
