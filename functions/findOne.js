import requestHandler from "../lib/handler";

export const handler = async (req, context) => {
	const collection = await requestHandler(req);
	const { filter } = JSON.parse(req.body);

	const results = await collection.findOne(filter);

	return {
		statusCode: 200,
		body: JSON.stringify(results),
	};
};
