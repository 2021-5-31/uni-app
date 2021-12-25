import ajax from "../../http.js"
export const PostFeedback = async (data) => {
	return await ajax({name:'feedback',data});
}
