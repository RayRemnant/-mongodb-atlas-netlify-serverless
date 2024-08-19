import requestHandler from "../lib/handler";

export const handler = async (req, context) => {
	console.log(req.body.collectionName);
	const collection = await requestHandler(req);
	const { filter } = JSON.parse(req.body);

	const results = await collection.find(filter).toArray();

	return {
		statusCode: 200,
		body: JSON.stringify(results),
	};
};
