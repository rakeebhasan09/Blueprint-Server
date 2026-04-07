import express from "express";
import { PopularProperties } from "../controllers/popular.controller";

const router = express.Router();

router.get("/", PopularProperties.getPopularProperties);

export const PopularProperty = router;
