export default {
	state:{
		labelList:uni.getStorageSync('labelList') || []
	},
	getters:{
		labelList(state){
			return state.labelList
		}
	},
	mutations:{
		setLabelList(state,labelList){
			state.labelList = labelList;
			uni.setStorageSync('labelList',labelList);
		},
	},
}