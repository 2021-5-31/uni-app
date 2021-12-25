'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {loginName,password,type,phone} = event;
	const {affectedDocs,data} = await db.collection('user').aggregate().match(type==='account'?{loginName,password}:{phone}).end();
	//返回数据给客户端
	return affectedDocs?{code:0,msg:'登录成功',data}:{code:-1,msg:type ==='account'?'账号或密码错误':'验证码错误'}
};
