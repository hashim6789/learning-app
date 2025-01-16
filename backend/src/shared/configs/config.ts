// src/configs/config.ts
import dotenv from "dotenv";

dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY,

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,

  MONGO_URI: process.env.MONGO_URI || "mongodb://mongo:27017/myapp",
};
