import ajax from "../../http.js"
export const updateLabel = async (data) => {
	return await ajax({name:'update-label',data});
}
