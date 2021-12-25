import ajax from "../../http.js"
export const searchArticle = async (data) => {
	return await ajax({name:'search',data});
}
