import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import dotenv from "dotenv";
import { MaterialType } from "../../shared/types";
import { Request, Response, NextFunction } from "express";

dotenv.config();

class S3Service {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }

  public async getObjectUrl(
    key: string,
    materialType: MaterialType
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${materialType}s/${key}`,
      ResponseContentDisposition: "inline",
      ResponseContentType: "application/octet-stream",
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 600 });
  }

  public async putObject(
    fileName: string,
    category: MaterialType,
    contentType: string
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${category}s/${fileName}`,
      ContentType: contentType,
      Body: "",
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 600 });
  }

  public async deleteFileFromS3(
    bucketName: string,
    fileKey: string
  ): Promise<void> {
    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      });

      await this.s3.send(deleteCommand);
      console.log("File deleted successfully");
    } catch (err) {
      console.error("Error deleting file:", err);
      throw new Error("File deletion failed");
    }
  }

  public uploadMiddleware() {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    return upload.single("file");
  }

  public async s3Upload(req: Request, res: Response, next: Function) {
    if (req.file) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: `uploads/${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      try {
        await this.s3.send(new PutObjectCommand(params));
        req.fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        next();
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "File upload failed", error });
      }
    } else {
      res.status(400).json({ success: false, message: "No file uploaded" });
    }
  }
}

export default S3Service;
