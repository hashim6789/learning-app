import express from "express";
import MaterialController from "../../controllers/MaterialController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const materialRouter = express.Router();
const materialController = new MaterialController();

materialRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  materialController.createMaterialForMentor
);
materialRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  materialController.getMaterialsOfMentor
);
materialRouter.get(
  "/:materialId",
  authenticateToken,
  authorizeRole(["mentor"]),
  materialController.getMaterialById
);
// materialRouter.get(
//   "/",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   MaterialController.getAllMaterialsOfCourse
// );
// coursesRouter.get(
//   "/:courseId",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   CourseController.getCourseOfMentorByCourseId
// );

export default materialRouter;
