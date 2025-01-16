import express from "express";
import CategoryController from "../../controllers/CategoryController";

const categoryRoutes = express.Router();

categoryRoutes.post("/", CategoryController.createCategoryForAdmin);
categoryRoutes.get(
  "/",
  CategoryController.fetchAllAvailableCategoriesForMentor
);
categoryRoutes.patch(
  "/:categoryId/block-unblock",
  CategoryController.listUnlistCategoryForAdmin
);

export default categoryRoutes;
