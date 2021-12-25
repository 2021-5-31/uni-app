export default ({name, data = {}}) => {
	return new Promise((resolve, reject) => {
		const isLoading = data.isLoading;
		data.isLoading && delete data.isLoading;
		!isLoading && uni.showLoading({
			title:"加载中"
		});
		uniCloud.callFunction({
			name,
			data,
			success(res) {
				const { result } = res
				if (result.code === 0) {
					resolve(result.data)
				} else {
					uni.showToast({
						icon: "none",
						title: result.msg
					})
				}
			},
			fail(err) {
				reject(err);
			},
			complete() {
				!isLoading && uni.hideLoading();
			}
		})
	})
}
