export default {
	namespaced:true,
	state:{
		userInfo:uni.getStorageSync('userInfo') || null
	},
	mutations:{
		setUserInfo(state,userInfo){
			state.userInfo = userInfo;
			uni.setStorageSync('userInfo',userInfo);
		}
	},
	actions:{
		// async getUserInfo({commit},{formInfo,_this}){
		// 	const res = await _this.$api.getUserInfo(formInfo);
		// 	commit('setUserInfo',res);
		// 	return res
		// }
	}
}