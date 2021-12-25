import ajax from "../../http.js"
export const getUserInfo = async (data) => {
	return await ajax({name:'get-userInfo',data});
}
