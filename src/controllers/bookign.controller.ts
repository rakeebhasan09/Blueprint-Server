import { Request, Response } from "express";
import { Booking } from "../models/bookings.model";

// Create a new booking
const createBooking = async (req: Request, res: Response) => {
    try {
        const newBooking = req.body;
        const result = await Booking.create(newBooking);
        if (result._id) {
            res.status(201).json({
                success: true,
                message: "Booking created successfully",
                booking: result,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to create booking",
            });
        }
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
        });
    }
};

export const BookingController = { createBooking };
