import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-secret";
const ACCESS_TOKEN_EXPIRATION = "1m";
const REFRESH_TOKEN_EXPIRATION = "7d";

export interface Payload {
  role: "admin" | "mentor" | "learner";
  userId: string;
}

export const generateAccessToken = (payload: Payload): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

export const generateRefreshToken = (payload: Payload): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

export const verifyAccessToken = (token: string): Payload | null => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (typeof decoded === "object" && decoded !== null) {
      return decoded as Payload;
    }
    return null;
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string): Payload | null => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    if (typeof decoded === "object" && decoded !== null) {
      return decoded as Payload;
    }
    return null;
  } catch {
    return null;
  }
};
