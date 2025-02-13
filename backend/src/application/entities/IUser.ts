// application/entities/IUser.ts
export interface IUser {
  id: string;
  email: string;
  password: string | null;
  isBlocked: boolean;
  isVerified: boolean;
  refreshToken: string | null;
  resetToken: string | null;
}
