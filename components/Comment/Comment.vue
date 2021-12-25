<template>
  <view>
    <uni-popup ref="popup" type="bottom" :mask-click="false">
      <!-- 内容区域 -->
      <view class="popup-wrapper">
        <view class="popup-header">
          <view class="popup-header-item" @click="closePopup">取消</view>
          <view class="popup-header-item" @click="sendCommentInfo">发布</view>
        </view>
        <view class="popup-content">
          <textarea class="popup-content-textarea" v-model.trim="commentContent" maxlength="200" fixed placeholder="请输入评论内容"></textarea>
          <view class="popup-content-count">{{commentContent.length}}/200</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "Comment",
  props: {
    showPopup: Boolean
  },
  watch: {
    showPopup (newVal) {
      newVal ? this.$refs.popup.open() : this.$refs.popup.close();
    }
  },
  data () {
    return {
      commentContent: ""
    };
  },
  methods: {
    closePopup () {
      this.$emit('closePopup', false)
    },
    // 发送评论数据
    sendCommentInfo () {
      if (!this.commentContent) {
        uni.showToast({
          title: "请输入评论内容",
          icon: 'none'
        })
        return
      }
      this.$emit('sendCommentInfo', this.commentContent)
      this.commentContent = ''
    }
  },
}
</script>

<style lang="scss">
.popup-wrapper {
  background-color: #ffffff;
  .popup-header {
    @include flex();
    font-size: 28rpx;
    color: #666;
    border-bottom: 1px #f5f5f5 solid;
    .popup-header-item {
      height: 100rpx;
      line-height: 100rpx;
      padding: 0 30rpx;
    }
  }
  .popup-content {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    .popup-content-textarea {
      height: 400rpx;
      width: 100%;
    }
    .popup-content-count {
      @include flex(flex-end);
      font-size: 24rpx;
      color: $c-9;
    }
  }
}
</style>
