import { model, Schema } from "mongoose";
import { TContact } from "../types/contact.interface";

const contactSchema = new Schema<TContact>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

export const Contact = model<TContact>("contacts", contactSchema);
