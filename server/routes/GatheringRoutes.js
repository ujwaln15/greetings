import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {
  createGathering,
  getGatheringMessages,
  getUserGatherings,
} from "../controllers/GatheringController.js";

const gatheringRoutes = Router();

gatheringRoutes.post("/create-gathering", verifyToken, createGathering);
gatheringRoutes.get("/get-user-gatherings", verifyToken, getUserGatherings);
gatheringRoutes.get(
  "/get-gathering-messages/:gatheringId",
  verifyToken,
  getGatheringMessages
);

export default gatheringRoutes;
