import express from "express";
import { PropertyRoutes } from "./property.routes";

const router = express.Router();

const moduleRoutes = [
	{
		path: "/properties",
		route: PropertyRoutes,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
