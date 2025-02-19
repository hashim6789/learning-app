// src/adapters/routes/purchaseHistoryRoutes.ts
import { Router } from "express";
import { PurchaseHistoryController } from "../../controllers/PurchaseHistoryController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const purchaseHistoryRouter = Router();

const purchaseHistoryController = new PurchaseHistoryController();

purchaseHistoryRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  purchaseHistoryController.getPurchasesByLearnerId
);

export default purchaseHistoryRouter;
