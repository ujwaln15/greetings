import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {
  createGathering,
  getUserGatherings,
} from "../controllers/GatheringController.js";

const gatheringRoutes = Router();

gatheringRoutes.post("/create-gathering", verifyToken, createGathering);
gatheringRoutes.get("/get-user-gatherings", verifyToken, getUserGatherings);

export default gatheringRoutes;
