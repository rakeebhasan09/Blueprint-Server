import type { Request, Response } from "express";
import app from "./app";
import connectToDatabase from "./config/database";

export default async function handler(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		await connectToDatabase();
		app(req, res);
	} catch (error) {
		console.error("Failed to initialize API request", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
}
