import express from "express";
import { BookingController } from "../controllers/bookign.controller";

const router = express.Router();
router.get("/", BookingController.getAllBookings);
router.post("/", BookingController.createBooking);

export const BookingRoutes = router;
