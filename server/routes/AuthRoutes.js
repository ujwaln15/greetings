import { Router } from "express";
import { getUserInfo, login, signUp } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/signup", signUp);
authRoutes.get("/user-info", verifyToken, getUserInfo);

export default authRoutes;
