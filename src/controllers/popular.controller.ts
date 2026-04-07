import { Request, Response } from "express";
import { Property } from "../models/propeties.model";

const getPopularProperties = async (req: Request, res: Response) => {
	try {
		const popularProperties = await Property.find({
			popular: true,
		})
			.sort({ createdAt: -1 })
			.limit(4);
		res.status(200).json({
			success: true,
			message: "Popular properties found.",
			total: popularProperties.length,
			popular: popularProperties,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: "No popular properties found",
			error: err.message,
		});
	}
};

export const PopularProperties = { getPopularProperties };
