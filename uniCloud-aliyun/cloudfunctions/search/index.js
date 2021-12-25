'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {searchVal} = event;
	const res = await db.collection('article')
	.aggregate().match({ title: new RegExp(searchVal) }).project({content:0}).end()
	//返回数据给客户端
	return {
		code:0,
		msg:'succss',
		data:{
			articleList:res.data,
		}
	}
};
