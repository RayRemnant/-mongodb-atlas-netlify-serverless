import { handler as getUniqueRecentDocs } from "./amazon/getUniqueRecentDocs";

export const handler = async (event, context, callback) => {
	let subPath = event.path.split("/")[4];

	console.log(subPath);
	switch (subPath) {
		case "getUniqueRecentDocs":
			return getUniqueRecentDocs(event, context);
		default:
			return {
				statusCode: 200,
				body: JSON.stringify({ error: "INVALID PATH" }),
			};
	}
};
