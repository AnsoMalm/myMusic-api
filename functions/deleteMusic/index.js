import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {DynamoDBDocumentClient, DeleteCommand, GetCommand} from "@aws-sdk/lib-dynamodb"
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














// const {sendResponse, sendError } = require()
// const { db } = require('../../services/db'); 


// exports.handler = async (event, context) => {
// 	const { musicId } = event.pathParameters; 

// 	try {
// 		await db.delete({
// 			//TableName: ''
// 			//Key: { id:  musicId }
// 		}).promise()
		
// 		return sendResponse(200, {success: true }) 
		
// 	} catch (error) {
// 		return sendError(500, {sucess: false, message: 'Could not remove music'  })
// 	}
// }