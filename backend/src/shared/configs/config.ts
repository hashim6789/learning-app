import dotenv from "dotenv";

dotenv.config();

export const config = {
  FRONTEND_HOST: process.env.FRONTEND_HOST,
  BACKEND_HOST: process.env.BACKEND_HOST,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY,

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,

  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  CACHE_KEY_GET_ALL_COURSES: process.env.CACHE_KEY_GET_ALL_COURSES || "",
  CACHE_KEY_GET_ALL_MENTOR_COURSES:
    process.env.CACHE_KEY_GET_ALL_MENTOR_COURSES || "",

  MONGO_URI: process.env.MONGO_URI || "mongodb://mongo:27017/myapp",
};
