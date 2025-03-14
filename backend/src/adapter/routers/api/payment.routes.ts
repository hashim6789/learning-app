import express from "express";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";
import PaymentController from "../../controllers/payment.controller";

//authController instance created.
//authRouter is created,

//----------------------admin authentication routes------------------------------//

/**
 * admin login route
 * endpoint - /admin/auth/login
 * method -  post
 * body - {email, password}
 * response - {success, message, data?}
 */

const paymentController = new PaymentController();

const paymentRouter = express.Router();

paymentRouter.post(
  "/create-payment-intent",
  paymentController.createPaymentIntent
);

paymentRouter.post(
  "/purchase-history",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  paymentController.createPaymentHistory
);

paymentRouter.post(
  "/subscription-history",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  paymentController.createSubscriptionHistory
);

paymentRouter.get(
  "/history/:purchaseId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  paymentController.getPaymentHistory
);

paymentRouter.get(
  "/subscription-history/:subscriptionId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  paymentController.getSubscriptionHistory
);

export default paymentRouter;
