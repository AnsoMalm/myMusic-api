
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {DynamoDBDocumentClient, UpdateCommand} from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({}); 
const dynamo = DynamoDBDocumentClient.from(client)

const tableName = "Music"; 

export const handler = async (event) => {
	let body; 
	let statusCode = 200; 
	const headers = {
		"Content-type": "application/json"
	}
	try {
		const group = JSON.parse(event.body)
		const id = event.pathParameters.id; 
		await dynamo.send(
			new UpdateCommand({
				TableName: tableName, 
				Key: {
					"id": id
				},
				UpdateExpression: "set SongTitle = :s",
				ExpressionAttributeValues: {
					":s": group.SongTitle
				}
			})
		)
		body = `Change songTitle ${id}`
		
	} catch (err) {
		statusCode = 400;
		body = err.message;
	  } finally {
		body = JSON.stringify(body);
	  }
	
	  return {
		statusCode,
		body,
		headers,
	  };
};