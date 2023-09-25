//const {sendResponse, sendError } = require()
const { db } = require('../../services/db'); 
//const { nanoid } = require('nanoid') //<-- ska installera det. 

exports.handler = async (event, context) => {
	//const {songTitle, album } = JSON.parse(event.body)

	try {
		//const id = nanoid()

		await db.put({
			//TableName: Mitt table i dynamodb,
			Item: {
				id: id, 
				songTitle: songTitle, 
				album: album,  
			}
		}).promise(); 

		return sendResponse(200, {success: true })
		
	} catch (error) {
		return sendError(500, {success: false, message: 'Could not add music'})
		
	}
}