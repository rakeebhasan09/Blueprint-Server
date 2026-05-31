import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

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
        if (emailPasswordRegistrationData) {
            const { fullname, email, role, password } =
                emailPasswordRegistrationData;

            // If send data is incomplete, return error
            if (!fullname || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Full name, email, and password are required",
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
                name: fullname,
                email,
                role,
                password,
                provider: "credentials",
                registeredAt: new Date(),
            };

            const result = await User.create(credentialBasedNewUser);
            if (result) {
                res.status(201).json({
                    success: true,
                    message: "Registration successful",
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Registration failed",
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

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Password verification logic should be implemented here
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to log in user",
        });
    }
};

export const UserController = {
    createUser,
    loginUser,
};
