import requestHandler from "../lib/handler";
import { handler as replaceOne } from "./replaceOne";

export const handler = async (req, context) => {
	const collection = await requestHandler(req);

	const { data: docs, databaseName, collectionName } = JSON.parse(req.body);

	docs.forEach((doc, index, array) => {
		replaceOne(
			{
				body: {
					collection,
					data: doc,
					filter: { _id: doc._id },
					databaseName,
					collectionName,
				},
			},
			//if last iteration, pass the res to respond to the client
			index === array.length - 1 ? res : undefined
		);
	});
};
