import requestHandler from "../lib/handler";

export const handler = async (req, context) => {
	const collection = await requestHandler(req);

	const { acknowledged, insertedId } = await collection.deleteMany(
		req.body.query
	);

	return {
		statusCode: 200,
		body: JSON.stringify({ acknowledged, insertedId }),
	};
};
