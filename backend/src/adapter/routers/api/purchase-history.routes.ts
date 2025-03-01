// src/adapters/routes/purchaseHistoryRoutes.ts
import { Router } from "express";
import { PurchaseHistoryController } from "../../controllers/purchase-history.controller";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";

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
