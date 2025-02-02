import multer from "multer";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";
import { Request, Response } from "express";
import { MaterialType } from "../../shared/types";

dotenv.config();

// Create an S3 Client instance (v3 SDK)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function getObjectUrl(key: string, materialType: MaterialType) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${materialType}s/${key}`,
    ResponseContentDisposition: "inline", // 👈 This forces the browser to display the file
    ResponseContentType: "application/octet-stream", // 👈 Allows the browser to decide the correct type
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 600 });
  return url;
}

async function putObject(
  fileName: string,
  category: MaterialType,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${category}s/${fileName}`,
    ContentType: contentType,
    Body: "", // AWS expects a body when creating signed URLs for upload
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 600 });
  return url;
}

const deleteFileFromS3 = async (bucketName: string, fileKey: string) => {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileKey, // File name or path inside the S3 bucket
    });

    const response = await s3.send(deleteCommand);
    console.log("File deleted successfully:", response);
  } catch (err) {
    console.error("Error deleting file:", err);
  }
};

// Multer setup for handling file upload
const storage = multer.memoryStorage(); // Store file in memory before uploading to S3

const upload = multer({ storage });

const s3Upload = (req: Request, res: Response, next: Function) => {
  if (req.file) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: `uploads/${Date.now()}-${req.file.originalname}`, // Create a unique key
      Body: req.file.buffer, // Use the file buffer (stored in memory)
      ContentType: req.file.mimetype,
    };

    // Upload file to S3
    s3.send(new PutObjectCommand(params))
      .then(() => {
        req.fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        next(); // Proceed to the next middleware
      })
      .catch((error) => {
        res
          .status(500)
          .json({ success: false, message: "File upload failed", error });
      });
  } else {
    res.status(400).json({ success: false, message: "No file uploaded" });
  }
};

// File delete function
// const deleteFileFromS3 = async (fileKey: string) => {
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME as string,
//     Key: fileKey,
//   };

//   try {
//     await s3.send(new PutObjectCommand(params)); // To delete, use DeleteObjectCommand instead
//     console.log("File deleted successfully");
//   } catch (error) {
//     console.error("Error deleting file from S3:", error);
//     throw new Error("File deletion failed");
//   }
// };

export { s3Upload, deleteFileFromS3, getObjectUrl, putObject };
