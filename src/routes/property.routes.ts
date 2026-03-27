import express from "express";
import { propertyControllers } from "../controllers/property.controller";
const router = express.Router();

// Get All Properties
router.get("/", propertyControllers.getProperties);

// Create A New Property
router.post("/", propertyControllers.createProperty);

// Delete A Property
router.delete("/:id", propertyControllers.deleteProperty);

export const PropertyRoutes = router;
