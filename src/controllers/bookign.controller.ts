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

// Get all bookings
const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            bookings,
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
        });
    }
};

export const BookingController = { createBooking, getAllBookings };
