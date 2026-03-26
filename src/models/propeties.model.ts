import { model, Schema } from "mongoose";
import { TProperties } from "../types/property.interface";

const propertySchema = new Schema<TProperties>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		location: { type: String, required: true },
		city: { type: String, required: true },
		featured: { type: Boolean, required: true },
		popular: { type: Boolean, required: true },
		bedrooms: { type: Number, required: true },
		bathrooms: { type: Number, required: true },
		sqft: { type: Number, required: true },
		type: { type: String, required: true },
		status: { type: String, required: true },
		rating: { type: Number, required: true },
		reviews: { type: Number, required: true },
		image: { type: String, required: true },
		images: { type: [String], required: true },
		features: { type: [String], required: true },
		yearBuilt: { type: Number, required: true },
		agent: { type: String, required: true },
		date: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export const Property = model<TProperties>("properties", propertySchema);
