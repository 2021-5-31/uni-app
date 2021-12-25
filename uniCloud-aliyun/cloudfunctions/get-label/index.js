'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const result = await db.collection('label').get();
	//返回数据给客户端
	return {
		code:0,
		msg:'succss',
		data:result.data
	}
};
