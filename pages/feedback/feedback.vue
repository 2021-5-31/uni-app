<template>
	<view>
		<view class="feedback-title">
			意见反馈：
		</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
		</view>

		<view class="feedback-title">
			反馈图片：
		</view>

		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imageList" :key="index">
				<view class="close-icon">
					<uni-icons type="closeempty" size="18" color="#fff" @click='deleteImage(index)'></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 添加图片的icon -->
			<view v-if="imageList.length < 5" class="feedback-image-item" @click="_addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>

		<button type="warn" class="feedback-button" @click="_submitFeedback">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imageList: []
			}
		},
		methods: {
			// 添加图片
			async _addImage() {
				const count = 5 - this.imageList.length;
				uni.chooseImage({
					count,
					success: (res) => {
						res.tempFilePaths.forEach((item, index) => {
							if (index < count) {
								this.imageList.push({
									url: item,
									name: res.tempFiles[index].name
								})
							}
						})
					},
				})
			},
			// 发送意见反馈的内容
			async _submitFeedback() {
				if (!this.content) {
					uni.showToast({
						title: '请输入您要反馈的问题',
						icon: 'none',
						position: 'top'
					})
					return
				}
				const imgUrlList = await Promise.all(this.getFileId())
				const res = await this.$api.PostFeedback({
					userId: this.userInfo.userInfo,
					imgUrlList
				});
				uni.showToast({
					title:res.msg,
					icon:'none'
				})
				this.content = '';
				this.imageList = [];
			},
			deleteImage(imageListIndex) {
				this.imageList = this.imageList.filter((item, index) => index !== imageListIndex);
			},
			getFileId() {
				return this.imageList.map(item => {
					return new Promise(async (resolve, reject) => {
						const result = await uniCloud.uploadFile({
							filePath: item.url,
							cloudPath: item.name,
						})
						resolve(result.fileID)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './css/feedback.scss'
</style>
