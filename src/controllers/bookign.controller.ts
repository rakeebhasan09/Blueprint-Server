import { Request, Response } from "express";

// Create a new booking
const createBooking = async (req: Request, res: Response) => {
    try {
        const newBooking = req.body;
        console.log("Received booking data:", newBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
        });
    }
};

export const BookingController = { createBooking };
