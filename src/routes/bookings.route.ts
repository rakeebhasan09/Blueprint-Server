import express from "express";
import { BookingController } from "../controllers/bookign.controller";

const router = express.Router();
router.get("/", BookingController.getAllBookings);
router.post("/", BookingController.createBooking);
router.patch("/:id", BookingController.updateBookingStatus);
router.delete("/:id", BookingController.deleteBooking);

export const BookingRoutes = router;
