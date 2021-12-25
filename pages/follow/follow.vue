<template>
  <view class="follow-container">
    <view class="follow-tab">
      <view class="follow-tab-box">
        <view class="follow-tab-item" :class="{active:currentIndex===0}" @click='currentIndex=0'>文章</view>
        <view class="follow-tab-item" :class="{active:currentIndex===1}" @click='currentIndex=1'>作者</view>
      </view>
    </view>
    <!-- 内容切换区域 -->
    <view class="follow-list-container">
      <swiper class="follow-list-swiper" :current="currentIndex" @change="currentIndex=$event.detail.current">
        <swiper-item :class="{'no-data':articleListNone}">
			{{articleListNone && '暂无收藏的文章'}}
          <ListItem :isShowLoading="isShowLoading" :articleList="articleList" v-if="articleList.length"></ListItem>
          <!-- <view v-if="articleListNone"  class="no-data">暂无收藏的文章</view> -->
        </swiper-item>
        <swiper-item>
          <FollowAuthorList :followAuthorList='followAuthorList' v-if="followAuthorList.length"/>
		  <view v-if="followAuthorListNone"  class="no-data">暂无关注的作者</view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  onLoad () {
    // #ifdef MP-WEIXIN
    if (!this.$store.state.userInfo) {
      uni.redirectTo({
        url: '/pages/login/login'
      })
      return
    }
    // #endif
    this.getFollowArticle();
	uni.$on('refreshFollowArticle',this.refreshFollowArticle);
	this.getFollowAuthor();
	uni.$on('refreshFollowAuthor',this.refreshFollowAuthor);
  },
  data () {
    return {
      currentIndex: 0,
      articleList: [],
      isShowLoading: false,
      articleListNone:'',
	  followAuthorListNone:false,
	  followAuthorList:[]
    }
  },
  methods: {
    async getFollowArticle (isLoading) {
      const list = await this.$api.getFollowArticle({ userId: this.userInfo.userInfo._id,isLoading })
	  if(!list.length){
		  this.articleListNone = true
	  }else{
		  this.articleListNone = ''
	  }
      this.articleList = list
    },
	async getFollowAuthor(isLoading){
		const list = await this.$api.getFollowAuthor({ userId: this.userInfo.userInfo._id ,isLoading})
		  this.followAuthorList = list
		  !list.length && (this.followAuthorListNone = true)
		
	},
	refreshFollowArticle(){
		this.getFollowArticle('noLoading');
	},
	refreshFollowAuthor(){
		this.getFollowAuthor('noLoading');
	}
  }
}
</script>

<style lang="scss">
@import "./css/follow.scss";
</style>
