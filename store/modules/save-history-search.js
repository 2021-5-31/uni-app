export default {
	state:{
		historyList:uni.getStorageSync('historyList') || []
	},
	getters:{
		historyList(state){
			return state.historyList
		}
	},
	mutations:{
		setHistoryList(state,history){
			const historyList = state.historyList;
			if(historyList.length >0 && historyList.includes(history)) return
			historyList.unshift(history);
			state.historyList = historyList;
			uni.setStorageSync('historyList',historyList);
		},
		clearHistoryList(state,history){
			state.historyList = [];
			uni.removeStorageSync('historyList');
		}
	},
}