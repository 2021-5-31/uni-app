import ajax from "../../http.js"
export const getComment = async (data) => {
	return await ajax({name:'get-comment',data});
}
