import express from "express";
import { BookingController } from "../controllers/bookign.controller";

const router = express.Router();
router.post("/", BookingController.createBooking);

export const BookingRoutes = router;
