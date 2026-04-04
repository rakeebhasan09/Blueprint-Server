import express from "express";
import { propertyControllers } from "../controllers/property.controller";
const router = express.Router();

// Create A New Property
router.post("/", propertyControllers.createProperty);

// Get All Properties
router.get("/", propertyControllers.getProperties);

// Get single Property
router.get("/:id", propertyControllers.getSingleProperty);

// Delete A Property
router.delete("/:id", propertyControllers.deleteProperty);

export const PropertyRoutes = router;
