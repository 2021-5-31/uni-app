import ajax from "../../http.js"
export const getFollowAuthor = async (data) => {
	return await ajax({name:'get-follow-author',data});
}
