import express from "express";
import { ContactController } from "../controllers/contact.controller";

const router = express.Router();
router.get("/", ContactController.getContacts);
router.post("/", ContactController.createContact);

export const ContactRoutes = router;
