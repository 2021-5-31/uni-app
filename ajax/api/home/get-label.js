import ajax from "../../http.js"
export const getLabel = async () => {
	return await ajax({name:'get-label'});
}
