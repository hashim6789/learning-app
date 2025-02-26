// src/adapters/routes/purchaseHistoryRoutes.ts
import { Router } from "express";
import { PurchaseHistoryController } from "../../controllers/purchase-history.controller";
import authenticateToken from "../../middleware/authenticate.middleware";
import checkUserBlocked from "../../middleware/check-blocked.middleware";
import authorizeRole from "../../middleware/authorize.middleware";

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
