import requestHandler from "../../lib/handler";

export const handler = async (req, context) => {
	const { region } = JSON.parse(req.body); // Assuming the region parameter is passed in the query TODO

	const collection = await requestHandler(req);

	// Aggregation pipeline to group by "asin" and "region" and select the document with the most recent "lastUpdated"
	const aggregationPipeline = [
		{
			$match: {
				asin: { $exists: true },
				region: { $exists: true },
				//the status field means that the page does not exists or redirects
				status: { $exists: false },
			},
		},
		{
			$addFields: {
				timestamp: { $toDate: "$_id" },
			},
		},
		{
			$sort: { timestamp: -1 },
		},
		{
			$group: {
				_id: { asin: "$asin", region: "$region" }, // Group by both "asin" and "region"
				document: { $first: "$$ROOT" },
			},
		},
		{
			$replaceRoot: { newRoot: "$document" },
		},
	];

	const uniqueDocuments = await collection
		.aggregate(aggregationPipeline)
		.toArray();
	console.log(uniqueDocuments);
	return {
		statusCode: 200,
		body: JSON.stringify(uniqueDocuments),
	};
};
