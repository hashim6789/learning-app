import jwt from "jsonwebtoken";
import { config } from "../configs/config";

export interface Payload {
  role: "admin" | "mentor" | "learner";
  userId: string;
}

export const generateAccessToken = (payload: Payload): string => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: config.JWT_ACCESS_EXPIRY,
  });
};

export const verifyAccessToken = (token: string): Payload | null => {
  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET as string);
    if (typeof decoded === "object" && decoded !== null) {
      return decoded as Payload;
    }
    return null;
  } catch {
    return null;
  }
};
