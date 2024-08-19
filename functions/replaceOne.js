import requestHandler from "../lib/handler";
import { ObjectId } from "mongodb";

export const handler = async (req, context, collection = undefined) => {
	//if called from replaceMany, collection is passed

	collection = collection || (await requestHandler(req));

	console.log("COLL ", collection);
	const { filter, data: doc } = JSON.parse(req.body);

	const responseData = await collection.replaceOne(filter, doc, {
		upsert: true,
	});

	console.log(`replaceOne OK`);

	return {
		statusCode: 200,
		body: JSON.stringify(responseData),
	};
};
