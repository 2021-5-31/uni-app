<template>
		<swiper class="swiper-container" :current='currentIndex' @change='changeCurrentIndex'>
			<swiper-item v-for="(item,index) in labelList" :key='item._id'>
				<view class="swiper-item">
					<ListItem :articleList='articleList[index]' :loadData='loadData[index]' @scrolltolower='scrolltolower' />
				</view>
			</swiper-item>
		</swiper>
</template>

<script>
	export default {
		name: "ArticleList",
		props: {
			labelList: Array,
			currentIndex: Number,
		},
		created () {
		  this.labelList.length && this.fetchData(this.currentIndex)
		},
		data() {
			return {
				articleList: {},
				loadData: {},
				page: 1,
				pageSize: 6
			};
		},
		watch: {
			labelList(newVal,oldVal) {
				if(JSON.stringify(newVal) === JSON.stringify(oldVal)){
					return
				}
				this.articleList = {};
				this.loadData = {};
				this.fetchData(this.currentIndex);
			}
		},
		methods: {
			changeCurrentIndex(e) {
				const {
					current
				} = e.detail
				this.$emit('changeCurrentIndex', current);
				if (this.articleList[current]) return
				this.fetchData(current);
			},
			async fetchData(currentIndex) {
				if (!this.loadData[currentIndex]) {
					this.loadData[currentIndex] = {
						page: 1,
						pageSize: 6,
						loading: 'loading',
						total: 0
					}
				}
				const {
					articleList,
					total
				} = await this.$api.getArticle({
					classify: this.labelList[currentIndex].name,
					page: this.loadData[currentIndex].page,
					pageSize: this.loadData[currentIndex].pageSize,
				});
				const oldList = this.articleList[currentIndex] || [];
				oldList.push(...articleList);
				this.$set(this.articleList, currentIndex, oldList)
				this.loadData[currentIndex].total = total;
			},
			scrolltolower() {
				if (this.loadData[this.currentIndex].total === this.articleList[this.currentIndex].length) {
					this.loadData[this.currentIndex]= {
						...this.loadData[this.currentIndex],
						...{loading:'noMore'}
					}
					this.$forceUpdate();
					return
				}
				this.loadData[this.currentIndex].page++;
				this.fetchData(this.currentIndex);
			}
		}
	}
</script>

<style lang="scss">
.swiper-container {
  height: 100%;
  .swiper-item {
    height: 100%;
    overflow: hidden;
  }
}
</style>
