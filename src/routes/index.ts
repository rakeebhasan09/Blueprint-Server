import express from "express";
import { PropertyRoutes } from "./property.routes";
import { FeaturedRoute } from "./featured.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
