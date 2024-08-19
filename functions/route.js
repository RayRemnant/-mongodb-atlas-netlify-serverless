export const handler = async (event, context, callback) => {
	return {
		statusCode: 200,
		body: JSON.stringify({ error: "INVALID PATH" }),
	};
};
