// src/adapters/routes/subscriptionHistoryRoutes.ts
import { Router } from "express";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";
import { SubscriptionHistoryController } from "../../controllers/subscription-history.controller";

const subscriptionHistoryRouter = Router();

const subscriptionHistoryController = new SubscriptionHistoryController();

subscriptionHistoryRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  subscriptionHistoryController.getSubscriptionsByLearnerId
);

export default subscriptionHistoryRouter;
