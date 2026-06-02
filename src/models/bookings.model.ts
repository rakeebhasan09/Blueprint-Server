import { model, Schema } from "mongoose";
import { TBookings } from "../types/bookings.interface";

const bookingSchema = new Schema<TBookings>(
    {
        userId: { type: String, required: true },
        propertyId: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerName: { type: String, required: true },
        customerPhone: { type: String, required: true },
        tourDate: { type: String, required: true },
        tourTime: { type: String, required: true },
        tourType: { type: String, required: true },
        status: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

export const Booking = model<TBookings>("bookings", bookingSchema);
