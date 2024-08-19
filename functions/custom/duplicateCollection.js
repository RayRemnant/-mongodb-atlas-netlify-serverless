import getCollection from "../../lib/getCollection";

export const handler = async (req, context) => {
	const { origin, destination } = req.body;

	try {
		// Get the origin collection
		const originCollection = await getCollection(
			origin.databaseName,
			origin.collectionName
		);

		// Retrieve data from the origin collection
		const originData = await originCollection.find({}).toArray();

		// Get the destination collection
		const destinationCollection = await getCollection(
			destination.databaseName,
			destination.collectionName
		);

		// Delete existing data in the destination collection
		await destinationCollection.deleteMany({});

		// Insert data from the origin collection into the destination collection
		await destinationCollection.insertMany(originData);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Data transferred successfully." }),
		};
	} catch (error) {
		console.error("Error transferring data:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "An error occurred while transferring data.",
			}),
		};
	}
};
