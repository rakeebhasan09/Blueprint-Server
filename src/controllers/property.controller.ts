import { Request, Response } from "express";
import { Property } from "../models/propeties.model";

// Create New Property
const createProperty = async (req: Request, res: Response) => {
	try {
		const savedProperty = await Property.create(req.body);
		res.status(201).json({
			success: true,
			message: "Property created successfully!!",
			data: savedProperty,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: "Failed to create new property",
			error: err.message,
		});
	}
};

// Get All Propertiec
const getProperties = async (req: Request, res: Response) => {
	try {
		const properties = await Property.find();
		res.status(200).json({
			success: true,
			message: "Successfully get all properties.",
			data: properties,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: "Failed to get all properties",
			error: err.message,
		});
	}
};

export const propertyControllers = { createProperty, getProperties };
