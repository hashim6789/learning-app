import express from "express";
import CategoryController from "../../controllers/CategoryController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const categoryRoutes = express.Router();
const categoryController = new CategoryController();

categoryRoutes.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  categoryController.fetchAllAvailableCategoriesForMentor
);

export default categoryRoutes;
