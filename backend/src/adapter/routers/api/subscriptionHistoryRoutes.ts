// src/adapters/routes/subscriptionHistoryRoutes.ts
import { Router } from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import { SubscriptionHistoryController } from "../../controllers/SubscriptionHistorycontroller";

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
