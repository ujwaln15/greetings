import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {
  getDuoContactsList,
  searchContacts,
} from "../controllers/ContactsController.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);
contactsRoutes.get("/get-duo-contacts", verifyToken, getDuoContactsList);

export default contactsRoutes;
