import { Request, Response } from "express";
import { Contact } from "../models/contact.model";

const createContact = async (req: Request, res: Response) => {
    try {
        const newContact = req.body;
        const result = await Contact.create(newContact);
        if (result._id) {
            res.status(200).json({
                success: true,
                message: "Contact form submitted.",
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to Submit Form..",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit your message.",
        });
    }
};

const getContacts = async (req: Request, res: Response) => {
    try {
        const contactMessages = await Contact.find().sort({
            createdAt: -1,
        });
        if (!contactMessages) {
            return res.status(404).json({
                success: false,
                message: "No Message Found",
            });
        }
        res.status(200).json({
            success: true,
            contacts: contactMessages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch contacts.",
        });
    }
};

export const ContactController = {
    createContact,
    getContacts,
};
