import express from "express";
import AuthControllers from "../../controllers/admin/AuthControllers";
import AdminRepository from "../../../infrastructures/database/repositories/AdminRepository";
import AdminLoginUseCase from "../../../application/use_cases/admin/AdminLoginUseCase";
import AdminLogoutUseCase from "../../../application/use_cases/admin/AdminLogoutUseCase";

const adminRepository = new AdminRepository();
const adminLoginUseCase = new AdminLoginUseCase(adminRepository);
const adminLogoutUseCase = new AdminLogoutUseCase(adminRepository);
const authController = new AuthControllers(
  adminLoginUseCase,
  adminLogoutUseCase
);

const authRouter = express.Router();

authRouter.post("/login", authController.AdminLogin.bind(authController));
authRouter.post("/logout", authController.AdminLogout.bind(authController));

export default authRouter;
