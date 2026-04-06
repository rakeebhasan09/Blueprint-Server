import express from "express";
import { featuredController } from "../controllers/featured.controller";

const router = express.Router();

router.get("/", featuredController.getFeaturedProperties);

export const FeaturedRoute = router;
