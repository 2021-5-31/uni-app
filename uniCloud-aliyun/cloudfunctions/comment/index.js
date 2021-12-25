'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		userId,
		articleId,
		commentContent,
		replyInfo,
	} = event;
	const { comment_id='',reply_id,is_reply} = replyInfo;
	console.log('asdf',userId,
		articleId,
		commentContent,comment_id,reply_id,is_reply);
	let user = await db.collection('user').doc(userId).get();
	user = user.data[0];
	const article = await db.collection('article').doc(articleId).get();
	const comments = article.data[0].comments;
	let commentObj = {
		comment_id: generatedId(5),
		comment_content: commentContent,
		create_time: Date.now(),
		is_reply,
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
		replyArr: []
	}
	if (comment_id === '') {
		commentObj = dbCmd.unshift(commentObj)
	} else {
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id);
		let fatherAuthor = null;
		if(is_reply){
			fatherAuthor = comments[commentIndex].replyArr.find(item => item.comment_id === reply_id).author.author_name;
		}else{
			fatherAuthor = comments.find(item => item.comment_id === comment_id).author.author_name;
		}
		commentObj.to = fatherAuthor;
		commentObj = {
			[commentIndex]: {
				replyArr: dbCmd.unshift(commentObj)
			}
		}
	}

	await db.collection('article').doc(articleId).update({
		comments: commentObj
	})

	function generatedId(num) {
		return Number(Math.random().toString().substr(3, num) + Date.now()).toString(36)
	}

	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: '添加数据成功'
		}
	}
};
