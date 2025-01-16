import express from "express";
import AuthControllers from "../../controllers/admin/AuthControllers";
import AdminRepository from "../../../infrastructures/database/repositories/AdminRepository";
import AdminLoginUseCase from "../../../application/use_cases/admin/AdminLoginUseCase";

const adminRepository = new AdminRepository();
const adminLoginUseCase = new AdminLoginUseCase(adminRepository);
const authController = new AuthControllers(adminLoginUseCase);

const authRouter = express.Router();

authRouter.post("/login", authController.AdminLogin.bind(authController));

export default authRouter;
