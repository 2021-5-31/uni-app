import ajax from "../../http.js"
export const changeUserAvatar = async (data) => {
	return await ajax({name:'change-user-avatar',data});
}
