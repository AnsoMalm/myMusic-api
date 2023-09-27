
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

		//ändra både gruppen och songtitle
		if (group.SongTitle && group.Group) {
			updateExpression += '#S = :s, #G = :g';
			expressionAttributeValues[':s'] = group.SongTitle;
			expressionAttributeValues[':g'] = group.Group;
		}

		//ändra songtitle
		else if (group.SongTitle) {
			updateExpression += ' #S = :s'; 
			expressionAttributeValues[':s'] = group.SongTitle; 
		}
		//ändra gruppen
		else if (group.Group) {
			updateExpression += ' #G = :g'; 
			expressionAttributeValues[':g'] = group.Group; 
		}
	
		
		await dynamo.send(
			new UpdateCommand({
				TableName: tableName, 
				Key: {
					"id": id
				},
				UpdateExpression: updateExpression,
				ExpressionAttributeValues: expressionAttributeValues, 
				ExpressionAttributeNames: {
					"#G": "Group", 
					"#S": "SongTitle"
				}
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


//Denna kod är för att kunna ändra songtitle i sin grupp. 
// 		await dynamo.send(
// 			new UpdateCommand({
// 				TableName: tableName, 
// 				Key: {
// 					"id": id
// 				},
// 				updateExpression: "set SongTitle = :s",
// 				ExpressionAttributeValues: {
// 					":s": group.SongTitle
// 				}
// 			})
// 		)
// 		body = `Change songTitle ${id}`
		
// 	} catch (err) {
// 		statusCode = 400;
// 		body = err.message;
// 	  } finally {
// 		body = JSON.stringify(body);
// 	  }
	
// 	  return {
// 		statusCode,
// 		body,
// 		headers,
// 	  };
// };