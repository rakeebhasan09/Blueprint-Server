import express from "express";
import { PropertyRoutes } from "./property.routes";
import { FeaturedRoute } from "./featured.route";
import { PopularProperty } from "./popular.route";

const router = express.Router();

const moduleRoutes = [
	{
		path: "/properties",
		route: PropertyRoutes,
	},
	{
		path: "/featured",
		route: FeaturedRoute,
	},
	{
		path: "/popular",
		route: PopularProperty,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
