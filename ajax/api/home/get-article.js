import ajax from "../../http.js"
export const getArticle = async (data) => {
	return await ajax({name:'get-article',data});
}
