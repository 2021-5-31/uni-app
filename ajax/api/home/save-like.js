import ajax from "../../http.js"
export const saveLike = async (data) => {
	return await ajax({name:'save-like',data});
}
