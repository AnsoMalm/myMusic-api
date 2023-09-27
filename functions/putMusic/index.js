
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb"
import {nanoid} from "nanoid"

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
		const id = nanoid()
		const group = JSON.parse(event.body); 
		await dynamo.send(
			new PutCommand({
				TableName: tableName,
				Item: {
					id: id, 
					Group: group.Group,
				} 
			})
		)
		body = `Put group ${id}`
		
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