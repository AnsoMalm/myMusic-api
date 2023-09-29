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
		
		let updateExpression = 'set'; 
		let expressionAttributeValues = {}; 
		let expressionAttributeNames = {}; 

		//ändra både gruppen och sångtitel
		if (group.SongTitle && group.Group) {
			updateExpression += '#S = :s, #G = :g';
			expressionAttributeValues[':s'] = group.SongTitle;
			expressionAttributeValues[':g'] = group.Group;
			expressionAttributeNames['#S'] = 'SongTitle';
			expressionAttributeNames['#G'] = 'Group';
		}

		//ändra sångtiteln
		else if (group.SongTitle) {
			updateExpression += ' #S = :s'; 
			expressionAttributeValues[':s'] = group.SongTitle; 
			expressionAttributeNames['#S'] = 'SongTitle';
		}
		//ändra gruppen
		else if (group.Group) {
			updateExpression += ' #G = :g'; 
			expressionAttributeValues[':g'] = group.Group;
			expressionAttributeNames['#G'] = 'Group'; 
		}
	
		//Ändrar utifrån id 
		await dynamo.send(
			new UpdateCommand({
				TableName: tableName, 
				Key: {
					"id": id
				},
				UpdateExpression: updateExpression,
				ExpressionAttributeValues: expressionAttributeValues, 
				ExpressionAttributeNames: expressionAttributeNames,
			})
		)
		body = `Change in your item ${id}`
	} catch (error) {
		statusCode = 400; 
		body = error.message;
	} finally {
		body = JSON.stringify(body); 
	}
	return {
		statusCode, 
		body, 
		headers, 
	}
}
