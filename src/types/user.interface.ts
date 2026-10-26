export interface TUser {
    name: string;
    email: string;
    role: "user" | "manager" | "admin";
    password: string;
    bookingCount: {
        type: Number;
        default: 0;
    };
}
