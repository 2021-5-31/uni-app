import ajax from "../../http.js"
export const thumbsUp = async (data) => {
	return await ajax({name:'thumbs-up',data});
}
