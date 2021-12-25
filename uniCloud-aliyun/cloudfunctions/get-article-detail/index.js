'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {_id} = event;
	await db.collection('article').update({
		browse_count: dbCmd.inc(1)
	})
	const res = await db.collection('article').aggregate().match({_id}).project({comments:0}).end();
	
	//返回数据给客户端
	return {
		code:0,
		msg:'获取文章详情成功',
		data:res.data[0],
	}
};
