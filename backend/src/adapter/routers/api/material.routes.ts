import express from "express";
import MaterialController from "../../controllers/material.controller";
import authenticateToken from "../../middleware/authenticate.middleware";
import authorizeRole from "../../middleware/authorize.middleware";
import checkUserBlocked from "../../middleware/check-blocked.middleware";

//authController instance created.
const materialController = new MaterialController();

//authRouter is created,
const materialRouter = express.Router();

//----------------------mentor materials routes------------------------------//

/**
 * mentor material create route
 * endpoint - /mentor/materials
 * method -  post
 * body - {title, description, type, filKey, duration}
 * response - {success, message, data:material}
 */
materialRouter.post(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  materialController.createMaterial
);

/**
 * mentor material update route
 * endpoint - /mentor/materials/:materialId
 * method -  put
 * body - {title, description, type, filKey, duration}
 * params - {materialId}
 * response - {success, message, data:material}
 */
materialRouter.put(
  "/:materialId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  materialController.updateMaterial
);

/**
 * mentor material delete route
 * endpoint - /mentor/materials/:materialId
 * method -  delete
 * params - {materialId}
 * response - {success, message, data:material}
 */
materialRouter.delete(
  "/:materialId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  materialController.deleteMaterial
);

/**
 * fetch mentor material route
 * endpoint - /mentor/materials
 * method -  get
 * params - {materialId}
 * response - {success, message, data:material}
 */
materialRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  materialController.getMaterials
);

/**
 * fetch mentor material route
 * endpoint -/mentor/materials/:materialId
 * method -  get
 * params - {materialId}
 * response - {success, message, data:material}
 */
materialRouter.get(
  "/:materialId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor", "admin"]),
  materialController.getMaterialById
);

export default materialRouter;
