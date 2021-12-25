<template>
  <view class="search-container">
    <!-- 搜索导航组件 -->
    <NavBar :isSearch="isSearch" :parentVal='parentVal' @searchVal='parentVal=$event' @getSearchList='getSearchList'></NavBar>
    <!-- 搜索包裹 -->
    <view v-if="isShowHistory" class="search-wrapper">
      <!-- 没有进行搜索的操作 -->
      <view class="search-history-container">
        <!-- 头部 -->
        <view class="search-header">
          <text class="history-text">搜索历史</text>
          <text class="history-clean" @click='clearHistory'>清空</text>
        </view>
        <!-- 内容部分 -->
        <view v-if="historyList.length" class="search-history-content">
          <view class="history-content-item" v-for="item in historyList" :key="item" @click='historySearch(item)'>{{item}}</view>
        </view>

        <view v-else class="no-data">当前没有搜索历史</view>
      </view>
		</view>
      <!-- 开始进行搜索的操作 -->
      <view v-else class="search-list-container">
        <ListItem v-if="searchList.length" :articleList='searchList' :isShowLoading="isShowLoading" @saveHistorySearch='saveHistorySearch'></ListItem>
         <view v-else class="no-data">没有搜索到相关数据</view>
      </view>
  </view>
</template>

<script>
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
  data () {
    return {
      isSearch: true,
      searchList:[],
	  parentVal:'',
	  isShowLoading:false,
	  isShowHistory:true,
    }
  },
  computed:{
	  ...mapGetters(['historyList'])
  },
  methods: {
	async getSearchList(){
		if(!this.parentVal){
			this.searchList = [];
			this.isShowHistory = true;
			return
		}
		const {articleList} = await this.$api.searchArticle({
			searchVal: this.parentVal,
		});
		this.isShowHistory = false;
		this.searchList = articleList;
	},
	saveHistorySearch(){
		this.setHistoryList(this.parentVal)
	},
	async historySearch(item){
		this.parentVal = item
		this.getSearchList();
	},
	clearHistory(){
		this.clearHistoryList();
	},
	...mapMutations(['setHistoryList','clearHistoryList'])
  }
}
</script>

<style lang="scss">
  @import './css/search.scss'
</style>
