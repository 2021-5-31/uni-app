import ajax from "../../http.js"
export const getArticleDetail = async (data) => {
	return await ajax({name:'get-article-detail',data});
}
