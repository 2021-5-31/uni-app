<template>
	<view class="article-detail-container">
		<view class="detail-title">
			{{articleInfo.title}}
		</view>
		<view class="detail-header">
			<view class="detail-logo">
				<image src="../../static/img/logo.jpeg" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{articleInfo.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{articleInfo.create_time}}</text>
					<text>{{articleInfo.browse_count}} 浏览</text>
					<text>{{articleInfo.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button type="default" class="detail-header-button" @click="follow">{{isFollow?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content-container">
			<view class="detail-html">
				<u-parse :content="articleContent" no-data="数据加载中..."></u-parse>
			</view>
			<!-- 评论展示组件 -->
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
					<CommentBox :commentInfo="item" @commentReply='commentReply'></CommentBox>
				</view>
				<view class="no-data" v-if="!commentList.length">暂无评论</view>
			</view>
		</view>

		<!-- 评论组件 -->
		<view class="detail-bottom">
			<view class="input-container" @click='editComment'>
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icon-box">
					<uni-icons type="chat" size="22" color="#f07373" @click="goCommentListPage"></uni-icons>
				</view>
				<view class="detail-bottom-icon-box">
					<SaveLikes :articleId='articleInfo._id' />
				</view>
				<view class="detail-bottom-icon-box">
					<uni-icons :type="isThumbsUp?'hand-up-filled':'hand-up'" size="22" color="#f07373"
						@click="thumbsUp"></uni-icons>
				</view>
			</view>
		</view>
		<Comment :showPopup='showPopup' @closePopup='showPopup=$event' @sendCommentInfo='sendCommentInfo' />
	</view>
</template>

<script>
	import {
		marked
	} from 'marked'
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				articleInfo: {},
				showPopup: false,
				commentList: [],
				replyInfo: {},
			}
		},
		async onLoad() {
			this.articleInfo = this.$Route.query;
			const articleInfo = await this.$api.getArticleDetail({
				_id: this.articleInfo._id
			});
			this.articleInfo = articleInfo;
			this.getComment();
		},
		computed: {
			articleContent() {
				// return this.articleInfo.content?marked(this.articleInfo.content):null
				try {
					return marked(this.articleInfo.content)
				} catch (err) {
					return null
				}
			},
			isFollow() {
				try {
					return this.userInfo.userInfo.author_likes_ids.includes(this.articleInfo.author.id)
				} catch (err) {
					return false
				}
			},
			isThumbsUp() {
				try {
					return this.userInfo.userInfo.thumbs_up_article_ids.includes(this.articleInfo._id)
				} catch (err) {
					return false
				}
			}
		},
		methods: {
			async editComment() {
				await this.isLogin();
				this.showPopup = true;
			},
			async sendCommentInfo(commentContent) {
				const res = await this.$api.comment({
					userId: this.userInfo.userInfo._id,
					articleId: this.articleInfo._id,
					commentContent,
					replyInfo: this.replyInfo
				});
				this.showPopup = false;
				uni.showToast({
					title: '评论成功',
					// icon: 'none'
				})
				// this.showPopup = false;
				this.replyInfo = {};
				this.getComment();
			},
			async getComment() {
				const res = await this.$api.getComment({
					articleId: this.articleInfo._id
				});
				this.commentList = res;
			},
			commentReply(replyInfo) {
				this.replyInfo = {
					comment_id: replyInfo.comment.comment_id,
					is_reply: replyInfo.isReply
				};
				replyInfo.comment.reply_id && (this.replyInfo.reply_id = replyInfo.comment.reply_id)
				this.editComment();
			},
			async follow() {
				await this.isLogin();
				const res = await this.$api.follow({
					userId: this.userInfo.userInfo._id,
					authorId: this.articleInfo.author.id
				});
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				let followIds = [...this.userInfo.userInfo.author_likes_ids]
				if (followIds.includes(this.articleInfo.author.id)) {
					followIds = followIds.filter(item => item != this.articleInfo.author.id)
				} else {
					followIds.push(this.articleInfo.author.id)
				}
				this.$store.commit('userInfo/setUserInfo', {
					...this.userInfo.userInfo,
					author_likes_ids: followIds
				});
				uni.$emit('refreshFollowAuthor')

			},
			async thumbsUp() {
				await this.isLogin();
				const res = await this.$api.thumbsUp({
					userId: this.userInfo.userInfo._id,
					articleId: this.articleInfo._id
				});
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				let thumbsUPIds = [...this.userInfo.userInfo.thumbs_up_article_ids]
				if (thumbsUPIds.includes(this.articleInfo._id)) {
					thumbsUPIds = thumbsUPIds.filter(item => item != this.articleInfo._id)
					this.articleInfo.thumbs_up_count -= 1;
				} else {
					thumbsUPIds.push(this.articleInfo._id)
					this.articleInfo.thumbs_up_count += 1;
				}
				this.$store.commit('userInfo/setUserInfo', {
					...this.userInfo.userInfo,
					thumbs_up_article_ids: thumbsUPIds
				})
				
			},
			goCommentListPage(){
				uni.navigateTo({
					url:`../commentList/commentList?articleId=${this.articleInfo._id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './css/articleDetail.scss'
</style>
