//const {sendResponse, sendError } = require()
const { db } = require('../../services/db'); 

exports.handler = async (event, context) => {
	const { musicId } = event.pathParameters; 
	const { music } = JSON.parse(event.body)

	try {
		await db.update({
			//TableName: '',  <-- tablename
			//Key: {id: musicId }  -> lärarens 
			//ReturnValues: 'ALL_NEW', 
			//UpdateExpression: 'set music = :music',   -> Lärarens ex set insult = :insult
			//ExpressionAttributeValues: {
			//':music': music   --> lärarens exempel ':insult': insult
			//}
		}).promise()
		
		return sendResponse(200, {success: true }), 

	} catch (error) {
		return sendError(500, { success: false, message: 'Could not update music' })
	}
 }