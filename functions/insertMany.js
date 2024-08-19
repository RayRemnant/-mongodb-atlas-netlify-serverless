import requestHandler from "../lib/handler";

export const handler = async (req, context) => {
	const collection = await requestHandler(req);
	const { data } = JSON.parse(req.body);

	const { acknowledged, insertedId } = await collection.insertMany(data);

	return {
		statusCode: 200,
		body: JSON.stringify({ acknowledged, insertedId }),
	};
};
