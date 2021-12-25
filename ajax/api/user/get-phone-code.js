import ajax from "../../http.js"
export const getPhoneCode = async (data) => {
	return await ajax({name:'get-phone-code',data});
}
