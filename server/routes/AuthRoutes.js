import { Router } from "express";
import {
  addDp,
  getUserInfo,
  login,
  removeDp,
  signUp,
  updateProfile,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/dps" });

authRoutes.post("/login", login);
authRoutes.post("/signup", signUp);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/add-dp", verifyToken, upload.single("dp"), addDp);
authRoutes.delete("/remove-dp", verifyToken, removeDp);

export default authRoutes;
