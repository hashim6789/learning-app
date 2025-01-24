import { Router } from "express";
import { UploadController } from "../../controllers/UploadController";
import { upload } from "../../../shared/configs/multerConfig";
import { CloudinaryService } from "../../../application/services/CloudinaryService";
import UploadCourseImageUseCase from "../../../application/use_cases/mentor/UploadCourseImageUseCase";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const uploadRouter = Router();

// Dependency injection
const cloudinaryService = new CloudinaryService();
const uploadFileUseCase = new UploadCourseImageUseCase(cloudinaryService);
const fileController = new UploadController(uploadFileUseCase);

// Route for file upload
uploadRouter.post(
  "/course-img",
  authenticateToken,
  authorizeRole(["mentor"]),
  upload.single("file"),
  (req, res) => fileController.uploadFile(req, res)
);

export default uploadRouter;
