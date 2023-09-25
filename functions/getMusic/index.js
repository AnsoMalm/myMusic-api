//const {sendResponse, sendError } = require()
const { db } = require('../../services/db'); 

const musics = [
	{	
		group: 'Lastkaj14',
		songTitle: 'Våra dar', 
		album: 'Stormar'
	}, 
	{
		group: 'MissLi',
		songTitle: 'Komplicerad', 
		album: 'Underbart i all misär',
		

	}
]

exports.handler = async (event, context) => {
	try {
		//hämtar allt i databasen
		const { Items } = await db.scan({
			TableName:
			FilterExpression: "attribute_exists(#DYNOBASE_ )",
			ExpressionAttributeNames: {
			"#DYNOBASE_": "", 
			} 
		}).promise()
		
		return sendResponse(200, {success: true, musics: Items }) 
		
	} catch (error) {
		return sendError(500, {sucess: false, message: 'Could not get musics'  })
	}
}