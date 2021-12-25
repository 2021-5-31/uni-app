import ajax from "../../http.js"
export const getCurrentVersion = async (data) => {
	return await ajax({name:'get-current-version',data});
}
