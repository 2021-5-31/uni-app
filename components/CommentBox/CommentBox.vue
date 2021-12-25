<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="commentInfo.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="title" v-if="!commentInfo.is_reply">
					{{commentInfo.author.author_name}}
				</view>
				<view v-else class="title">
					{{commentInfo.author.author_name}}
					<text class="reply-text">回复</text>
					{{commentInfo.to}}
				</view>
				<view class="">
					<uni-dateformat :date="commentInfo.create_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>
		</view>
		<!-- 内容部分 -->
		<view class="comment-content">
			<view class="">
				{{commentInfo.comment_content}}
			</view>
			<view class="comment-info">
				<view class="comment-button" @click='commentReply({comment:commentInfo,isReply})'>
					回复
				</view>
			</view>
			<view class="comment-reply-list" v-for="item in commentInfo.replyArr" :key="item._comment_id">
				<CommentBox :isReply="true" @commentReply="commentReply" :commentInfo="item"></CommentBox>
			</view>

		</view>
	</view>
</template>

<script>
	import CommentBox from '@/components/CommentBox/CommentBox';
	export default {
		name: 'CommentBox',
		 components: {
		    CommentBox,
		  },
		props: {
			commentInfo: Object,
			isReply: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			commentReply(data) {
				if(data.isReply){
					data.comment.reply_id = data.comment.comment_id;
					data.comment.comment_id = this.commentInfo.comment_id;
				}
				this.$emit('commentReply', data);
			}
		}
	}
</script>

<style lang="scss">
	@import "./css/CommentBox.scss";
</style>
