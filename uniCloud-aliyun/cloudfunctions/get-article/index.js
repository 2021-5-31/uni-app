'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {classify,page=1,pageSize=6} = event;
	let obj = {}
	if(classify !== '全部'){
		obj = {classify}
	}
	const res = await db.collection('article')
	.aggregate().match(obj).project({content:0}).skip(pageSize * (page-1)).limit(pageSize).end()
	const {total} = await db.collection('article').where(obj).count();
	//返回数据给客户端
	return {
		code:0,
		msg:'succss',
		data:{
			articleList:res.data,
			total
		}
	}
};
