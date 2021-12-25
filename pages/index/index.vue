<template>
	<view class='home-container'>
		<NavBar />
		<TabBar :labelList='labelList' :currentIndex='currentIndex' @changeCurrentIndex='changeCurrentIndex' />
		<ArticleList :labelList='labelList' :currentIndex='currentIndex' @changeCurrentIndex='changeCurrentIndex'
			class="list-container" />
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: 'index',
		data() {
			return {
				currentIndex: 0
			}
		},
		onLoad() {
			this.initGetLabel()
		},
		computed: {
			...mapGetters(['labelList']),
			labelList(){
				if(this.userInfo.userInfo){
					this.currentIndex = 0;
					return [...this.$store.getters.labelList.slice(0,1),...this.$store.getters.labelList.filter(item => this.userInfo.userInfo.label_ids.includes(item._id))]
				}else{
					return this.$store.getters.labelList;
				}
			}
		},
		methods: {
			async initGetLabel() {
				const res = await this.$api.getLabel();
				this.setLabelList([{
					name: '全部'
				}, ...res]);
			},
			changeCurrentIndex(index) {
				this.currentIndex = index;
			},
			...mapMutations(['setLabelList'])
		},

	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home-container {
		overflow: hidden;
		flex: 1;
		box-sizing: border-box;
		@include flex(flex-start, column);
		align-items: inherit;
	}

	.list-container {
		flex: 1;
		box-sizing: border-box;
	}
</style>
