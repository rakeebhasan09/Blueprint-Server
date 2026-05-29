import { Request, Response } from "express";
import { User } from "../models/user.model";

// Create new user
const createUser = async (req: Request, res: Response) => {
    try {
        const { user, account, emailPasswordRegistrationData } = req.body;

        // Social Login user creation
        if (account?.provider && account.provider !== "credentials") {
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User data is required",
                });
            }

            const newUser = {
                name: user.name,
                email: user.email,
                role: "user",
                provider: account.provider,
                registeredAt: new Date(),
            };

            // User record save to database
            const result = await User.create(newUser);
            if (result) {
                res.status(201).json({
                    success: true,
                    message: "User created successfully",
                    user: result,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to create user",
                });
            }
        }

        // Handle credential-based user creation if needed
        console.log("Creating user with credentials:", {
            emailPasswordRegistrationData,
        });
        if (emailPasswordRegistrationData) {
            const { name, email, password } = emailPasswordRegistrationData;
            // If send data is incomplete, return error
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Name, email, and password are required",
                });
            }

            // Ensure email is unique
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use",
                });
            }

            // Create new user record
            const credentialBasedNewUser = {
                name,
                email,
                role: "user",
                password,
                provider: "credentials",
                registeredAt: new Date(),
            };
        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const UserController = {
    createUser,
};
