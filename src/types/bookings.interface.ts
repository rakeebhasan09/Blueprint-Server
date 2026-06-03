export interface TBookings {
    userId: string;
    propertyId: string;
    propertyTitle: string;
    customerEmail: string;
    customerName: string;
    customerPhone: string;
    tourDate: string;
    tourTime: string;
    bookingId: string;
    tourType: "In-Person Tour" | "Virtual Tour";
    status: "Pending" | "Confirmed" | "Cancelled";
}
