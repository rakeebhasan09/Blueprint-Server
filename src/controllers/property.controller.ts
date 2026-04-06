import { Request, Response } from "express";
import { Property } from "../models/propeties.model";
import mongoose from "mongoose";

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
		const { type, excludeId } = req.query;
		const query: any = {};
		if (type && typeof type === "string") {
			query.type = type; // ✅ correct assignment
		}

		if (excludeId && typeof excludeId === "string") {
			query._id = {
				$ne: new mongoose.Types.ObjectId(excludeId),
			};
		}

		console.log(type, excludeId);
		const properties = await Property.find().sort({ createdAt: -1 });
		const relatedProperties = await Property.find(query)
			.sort({ createdAt: -1 })
			.limit(4);

		if (type && excludeId) {
			console.log(relatedProperties);
			return res.status(200).json({
				success: true,
				message: "Successfully get all properties.",
				relatedProperties: relatedProperties,
			});
		}
		res.status(200).json({
			success: true,
			message: "Successfully get all properties.",
			properties: properties,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: "Failed to get all properties",
			error: err.message,
		});
	}
};

// Get Property By ID
const getSingleProperty = async (req: Request, res: Response) => {
	try {
		const singleProperty = await Property.findById(req.params.id);
		if (!singleProperty) {
			return res.status(404).json({
				success: false,
				message: "Property not found",
			});
		}
		res.status(200).json({
			success: true,
			message: "Property found.",
			property: singleProperty,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: "Failed to get property",
			error: err.message,
		});
	}
};

// Delete Single Property
const deleteProperty = async (req: Request, res: Response) => {
	try {
		const deletedProperty = await Property.findByIdAndDelete(req.params.id);
		if (!deletedProperty) {
			return res.status(404).json({
				success: false,
				message: "Property not found",
			});
		}
		res.status(200).json({
			success: true,
			message: "Property deleted successfully.",
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: "Something went wrong.",
			error: err.message,
		});
	}
};

export const propertyControllers = {
	createProperty,
	getProperties,
	getSingleProperty,
	deleteProperty,
};
