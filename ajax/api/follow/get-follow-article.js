import ajax from "../../http.js"
export const getFollowArticle = async (data) => {
	return await ajax({name:'get-follow-article',data});
}
