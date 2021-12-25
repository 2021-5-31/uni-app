import ajax from "../../http.js"
export const getMyArticle = async (data) => {
	return await ajax({name:'get-my-article',data});
}
