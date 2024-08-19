import requestHandler from "../../lib/handler";

export const handler = async (req, context) => {
	const collection = await requestHandler(req);

	const totalCount = await collection.countDocuments({});

	var quarterCount = Math.ceil(totalCount * 0.3);

	// Find and sort documents by "score" parameter in descending order
	const results = await collection
		.find({})
		.sort({ score: -1 }) // Sort by "score" in descending order
		.limit(quarterCount)
		.toArray();

	return {
		statusCode: 200,
		body: JSON.stringify(results),
	};
};
