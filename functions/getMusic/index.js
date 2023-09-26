import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {DynamoDBClient, ScanCommand, GetCommand} from "aws-sdk/lik-dynamodb"

const client = new DynamoDBClient({}); 
const dynamo = DynamoDBDocumentClient.from(client)

const TableName = "Music"; 

// const musics = [
// 	{	
// 		group: 'Lastkaj14',
// 		songTitle: 'Våra dar', 
// 		album: 'Stormar'
// 	}, 
// 	{
// 		group: 'MissLi',
// 		songTitle: 'Komplicerad', 
// 		album: 'Underbart i all misär',
		
// 	}
// ]

export const handler = async (event, context) => {
	let body; 
	let statusCode = 200; 
	const headers = {
		"Content-type": "application/json"
	}

	try {
		switch (event.routeKey) {
			case "GET /items": 
			body = await dynamo.send(
				new ScanCommand({TableName: TableName})
			); 
			body = body.Items
		}
		
		return {
			statusCode, 
			body, 
			headers,
		}
		
	} catch (err) {
		statusCode = 400; 
		body = err.message; 
	} finally {
		body = JSON.stringify(body); 
	}
}