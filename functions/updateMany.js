import requestHandler from "../lib/handler";

export const handler = async (req, context) => {
	const collection = await requestHandler(req);

	const {
		filter,
		data,
		update = data
			? {
					$set: {
						...data,
					},
			  }
			: update,
	} = JSON.parse(req.body);

	const { acknowledged, modifiedCount } = await collection.updateMany(
		filter,
		update,
		{ upsert: true }
	);

	return {
		statusCode: 200,
		body: JSON.stringify({ acknowledged, modifiedCount }),
	};
};
