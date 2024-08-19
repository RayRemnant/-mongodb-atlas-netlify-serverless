import requestHandler from "../lib/handler";

export const handler = async (req, context) => {
	const collection = await requestHandler(req);

	const { filter, data: update } = JSON.parse(req.body);

	console.log(filter, update);

	const { acknowledged, insertedId } = await collection.updateOne(
		filter,
		{
			$set: {
				...update,
			},
		},
		{ upsert: true }
	);

	return {
		statusCode: 200,
		body: JSON.stringify({ acknowledged, insertedId }),
	};
};
