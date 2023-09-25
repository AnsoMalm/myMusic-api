const {sendResponse, sendError } = require()
const { db } = require('../../services/db'); 


exports.handler = async (event, context) => {
	const { musicId } = event.pathParameters; 

	try {
		await db.delete({
			//TableName: ''
			//Key: { id:  musicId }
		}).promise()
		
		return sendResponse(200, {success: true }) 
		
	} catch (error) {
		return sendError(500, {sucess: false, message: 'Could not remove music'  })
	}
}