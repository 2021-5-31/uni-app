<template>
	<view>
		<view class='navbar-container'>
			<view :style="{height:statusBarHeight + 'rpx'}"></view>
			<view @click="returnArticleList" :style="{top:statusBarHeight + 'rpx'}" class="return-icon" v-if="isSearch">
				<uni-icons type="back" size="22" color="white"></uni-icons>
			</view>

			<view @click="goSearchPage" class="search"
				:style="{marginRight:marginRight + 'rpx',marginLeft:isSearch?'20rpx':''}">
				<uni-icons class="search-icon" type="search" size="20" color="#999"></uni-icons>
				<view v-if="!isSearch" class='text'>输入文章标题进行搜索</view>
				<input v-else class="search-input" type="text" placeholder="输入文章标题进行搜索" @confirm='searchConfirm'
					v-model.trim="searchVal" confirm-type="search" >
			</view>

		</view>
		<view :style="{height:80 + statusBarHeight + 'rpx'}"></view>
	</view>
</template>

<script>
	export default {
		name: "NavBar",
		props: {
			isSearch: {
				type: Boolean,
				default: false,
			},
			parentVal: String,
		},
		data() {
			return {
				statusBarHeight: 20,
				marginRight: 0,
			};
		},
		created() {
			const info = uni.getSystemInfoSync()
			info.statusBarHeight && (this.statusBarHeight = info.statusBarHeight * 2);
			// #ifdef MP-WEIXIN
			const menuButton = uni.getMenuButtonBoundingClientRect();
			this.statusBarHeight = menuButton.top * 2;
			this.marginRight = menuButton.width * 2
			// #endif
		},
		computed: {
			searchVal: {
				get() {
					return this.parentVal;
				},
				set(val) {
					this.$emit('searchVal', val);
					if(!val){
						this.$emit('getSearchList');
					}
				}
			}
		},
		methods: {
			goSearchPage() {
				if (this.isSearch) return
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			returnArticleList() {
				// #ifdef H5
				uni.switchTab({
					url: '/pages/index/index'
				})
				// #endif
				// #ifndef H5
				uni.navigateBack()
				// #endif

			},
			async searchConfirm() {
				this.$emit('getSearchList')
			}
		}
	}
</script>

<style lang='scss'>
	@import './css/navbar.scss';
</style>
