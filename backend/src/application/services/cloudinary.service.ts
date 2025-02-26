import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

export interface ICloudinaryService {
  uploadImage(file: Express.Multer.File): Promise<string>;
}

export class CloudinaryService implements ICloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "course_thumbnails" },
        (error, result) => {
          if (error) {
            reject(new Error(`Cloudinary error: ${error.message}`));
          } else if (result) {
            resolve(result.secure_url); // Access the `secure_url` safely
          } else {
            reject(new Error("Unknown Cloudinary error occurred"));
          }
        }
      );

      // Convert the file buffer into a readable stream and pipe it to Cloudinary
      const stream = Readable.from(file.buffer);
      stream.pipe(uploadStream);
    });
  }
}
