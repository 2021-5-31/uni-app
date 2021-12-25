<template>
	<view class="save-incons" @click.stop="changeLikes">
		<uni-icons color="#ff6600" :type="isSave?'heart-filled':'heart'" size="20"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "SaveLikes",
		props: {
			articleId: String
		},
		data() {
			return {

			};
		},
		computed: {
			isSave() {
				try {
					return this.userInfo.userInfo.article_likes_ids.includes(this.articleId);
				} catch (err) {
					return false
				}
			}
		},
		methods: {
			async changeLikes() {
				await this.isLogin();
				const res = await this.$api.saveLike({
					userId: this.userInfo.userInfo._id,
					articleId: this.articleId
				});
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
				res.newUserInfo
				this.$store.commit('userInfo/setUserInfo', res.newUserInfo);
				uni.$emit('refreshFollowArticle')
			}
		},
	}
</script>

<style>

</style>
