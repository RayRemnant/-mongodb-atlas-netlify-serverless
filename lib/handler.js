import getCollection from "./getCollection";

export default async (req) => {
	if (req.httpMethod == "POST") {
		const { databaseName, collectionName } = JSON.parse(req.body);
		return await getCollection(databaseName, collectionName);
	}
};
