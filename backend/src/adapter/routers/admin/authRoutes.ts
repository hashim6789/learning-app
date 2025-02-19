// import express from "express";
// import authenticateToken from "../../middleware/authenticateMiddlewares";
// import authorizeRole from "../../middleware/authorizationMiddlewares";
// import AdminAuthController from "../../controllers/AdminAuthControllers";

// //authController instance created.
// const authController = new AdminAuthController();

// //authRouter is created,
// const authRouter = express.Router();

// //----------------------admin authentication routes------------------------------//

// /**
//  * admin login route
//  * endpoint - /admin/auth/login
//  * method -  post
//  * body - {email, password}
//  * response - {success, message, data?}
//  */
// authRouter.post("/login", authController.AdminLogin);

// /**
//  * admin logout route
//  * endpoint - /admin/auth/logout
//  * method -  post
//  * body - {}
//  * response - {success, user, message, data?}
//  */
// authRouter.post(
//   "/logout",
//   authenticateToken,
//   authorizeRole(["admin"]),
//   authController.AdminLogout
// );

// export default authRouter;
