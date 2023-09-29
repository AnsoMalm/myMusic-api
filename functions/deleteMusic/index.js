import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {DynamoDBDocumentClient, DeleteCommand, GetCommand} from "@aws-sdk/lib-dynamodb"

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
		//Känna av om det är rätt id
		const { Item } = await dynamo.send(
			new GetCommand({
				TableName: tableName, 
				Key: {
					id: event.pathParameters.id
				}
			})
		)
		if (!Item) {
			throw new Error('ID not found')
		}
		//rätt id - ta bort gruppen med namn och sångtitel
		await dynamo.send(
			new DeleteCommand({
				TableName: tableName, 
				Key: {
					id: event.pathParameters.id
				}
			})
		)
		body = `Deleted group ${event.pathParameters.id}`
		
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
