import { Request, Response } from "express";

// Create new user
const createUser = async (req: Request, res: Response) => {
    try {
        const { user, account } = req.body;
        if (!user) {
            console.error("User data is missing in the request body");
            return res.status(400).json({
                success: false,
                message: "User data is required",
            });
        }

        if (account.provider !== "credentials") {
            const newUser = {
                name: user.name,
                email: user.email,
                role: "user",
                provider: account.provider,
                registeredAt: new Date(),
            };
            console.log("Received user data:", newUser);
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
