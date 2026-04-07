import { Request, Response } from "express";
import { Property } from "../models/propeties.model";

const getFeaturedProperties = async (req: Request, res: Response) => {
	try {
		const featuredProperties = await Property.find({
			featured: true,
		})
			.sort({ createdAt: -1 })
			.limit(4);

		res.status(200).json({
			success: true,
			message: "Featured properties found.",
			total: featuredProperties.length,
			featured: featuredProperties,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: "No featured property found.",
			error: err.message,
		});
	}
};

export const featuredController = { getFeaturedProperties };
