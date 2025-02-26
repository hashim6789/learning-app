// src/adapters/routes/subscriptionHistoryRoutes.ts
import { Router } from "express";
import authenticateToken from "../../middleware/authenticate.middleware";
import checkUserBlocked from "../../middleware/check-blocked.middleware";
import authorizeRole from "../../middleware/authorize.middleware";
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
