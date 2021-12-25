<template>
	<view class="list-scroll-container">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower='scrolltolower'>
			<view>
				<ListCard @saveHistorySearch='$emit("saveHistorySearch")' :item="item" v-for="item in articleList" :key="item._id" />
				<uni-load-more v-if='isShowLoading && (articleList &&(articleList.length === 0 || articleList.length > 5))' :status="loadData.loading || 'loading'" ></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "ListItem",
		props:{
			articleList:Array,
			loadData:{
				default(){
					return {
						loading:'loading'
					}
				}
			},
			isShowLoading:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			scrolltolower(){
				this.$emit('scrolltolower')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll-container {
		height: 100%;

		.list-scroll {
			overflow: hidden;
			height: 100%;
			box-sizing: border-box;
		}
	}
</style>
