import { Request, Response } from "express";
import { Booking } from "../models/bookings.model";
import { User } from "../models/user.model";

// Create a new booking
const createBooking = async (req: Request, res: Response) => {
    try {
        const newBooking = req.body;
        const result = await Booking.create(newBooking);
        if (result._id) {
            await User.findByIdAndUpdate(
                { _id: newBooking.userId },
                { $inc: { bookingCount: 1 } },
            );

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
        const { customerEmail } = req.query;
        const bookings = await Booking.find(
            customerEmail ? { customerEmail } : {},
        ).sort({ createdAt: -1 });
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

// Update booking Status
const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const booking = await Booking.findByIdAndUpdate(id, payload, {
            new: true,
        });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Status updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
};

// Delete a booking
const deleteBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully.",
        });
    } catch (error) {
        console.error("Booking deleting error", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const BookingController = {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    deleteBooking,
};
