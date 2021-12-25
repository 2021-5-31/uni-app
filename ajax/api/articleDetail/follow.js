import ajax from "../../http.js"
export const follow = async (data) => {
	return await ajax({name:'follow',data});
}
