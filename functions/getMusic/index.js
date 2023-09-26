import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {DynamoDBClient, ScanCommand, GetCommand} from "aws-sdk/lik-dynamodb"

const client = new DynamoDBClient({}); 
const dynamo = DynamoDBDocumentClient.from(client)

const TableName = "Music"; 

export const handler = async (event) => {
	let body; 
	let statusCode = 200; 
	const headers = {
		"Content-type": "application/json"
	}

	try {
			body = await dynamo.send(
				new ScanCommand({TableName: TableName})
			); 
			body = body.Items
		
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
	}
}