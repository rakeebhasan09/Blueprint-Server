import { Request, Response } from "express";
import { User } from "../models/user.model";

// Create new user
const createUser = async (req: Request, res: Response) => {
    try {
        const { user, account } = req.body;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User data is required",
            });
        }

        // Social Login user creation
        if (account.provider !== "credentials") {
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
