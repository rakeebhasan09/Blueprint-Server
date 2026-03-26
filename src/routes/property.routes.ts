import express from "express";
import { propertyControllers } from "../controllers/property.controller";
const router = express.Router();

// Get All Properties
router.get("/", propertyControllers.getProperties);

// Create A New Property
router.post("/", propertyControllers.createProperty);

export const PropertyRoutes = router;
