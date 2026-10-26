import mongoose from "mongoose";
import config from ".";

let connectionPromise: Promise<typeof mongoose> | undefined;

export default async function connectToDatabase(): Promise<void> {
	const uri = config.database_url;
	if (!uri) {
		throw new Error("Database URL is not provided in environment variables");
	}

	if (mongoose.connection.readyState === 1) {
		return;
	}

	if (mongoose.connection.readyState !== 2 || !connectionPromise) {
		const pendingConnection = mongoose.connect(uri);
		connectionPromise = pendingConnection;

		try {
			await pendingConnection;
		} catch (error) {
			if (connectionPromise === pendingConnection) {
				connectionPromise = undefined;
			}
			throw error;
		}

		return;
	}

	await connectionPromise;
}
