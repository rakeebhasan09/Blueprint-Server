import app from "./app";
import config from "./config";
import connectToDatabase from "./config/database";

async function main() {
	try {
		await connectToDatabase();
		console.log("Connected to MongoDB successfully");

		app.listen(config.port, () => {
			console.log(`Server is listening on port ${config.port}`);
		});
	} catch (err) {
		console.error("Failed to connect to MongoDB", err);
		process.exit(1);
	}
}

main();
