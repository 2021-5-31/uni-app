<template>
	<view class="tabbar-container">
		<scroll-view scroll-x='true' class="tab-scroll" :scroll-into-view='scrollIntoIndex' scroll-with-animation>
			<view class="tab-scroll-box">
				<view @click="navClickFn(index)" :class='{active:currentIndex===index}' class="tab-scroll-item" :id='"item" + index' 
					v-for="(item,index) in labelList" :key='item.id'>
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class='tab-icon' @click='goLabelPage'>
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TabBar",
		props: {
			labelList: {
				type: Array
			},
			currentIndex: Number,
		},
		watch:{
			currentIndex(index){
				this.scrollIntoIndex = "item" + index;
			}
		},
		data() {
			return {
			scrollIntoIndex:''
			};
		},
		methods: {
			navClickFn(index) {
				this.$emit('changeCurrentIndex', index);
			},
			async goLabelPage(){
				await this.isLogin();
				uni.navigateTo({
					url:'/pages/label/label'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import './css/TabBar.scss'
</style>
