import ajax from "../../http.js"
export const comment = async (data) => {
	return await ajax({name:'comment',data});
}
