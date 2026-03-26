export interface TProperties {
	title: string;
	description: string;
	price: number;
	location: string;
	city: string;
	bedrooms: number;
	bathrooms: number;
	sqft: number;
	type: string;
	status: "For Sale" | "For Rent" | "Sold";
	rating: number;
	reviews: number;
	image: string;
	images: string[];
	features: string[];
	yearBuilt: number;
	agent: string;
	date: string;
}
