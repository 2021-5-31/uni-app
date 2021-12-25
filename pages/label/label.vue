<template>
	<view class="label-container">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="startEdit">{{this.isEdit? '完成' :'编辑'}}</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="(item,index) in myLabelList" :key="item._id">
					{{item.name}}
					<uni-icons v-if="isEdit" class="icon-close" type="clear" size="20" color="red"
						@click="deleteLabel(item)"></uni-icons>
				</view>
				<view class="no-data" v-if="!myLabelList.length">当前没有数据</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="(item,index) in recommendedLabelList" :key="item._id"
					@click="addLabel(item)">
					{{item.name}}
				</view>
				<view class="no-data" v-if='!recommendedLabelList.length'>当前没有数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				isEdit: false,
				labelIds: [],
			}
		},
		watch: {
			userInfo: {
				immediate: true,
				handler(val) {
					this.labelIds = [...(this.userInfo.userInfo.label_ids)];
				}
			}
		},
		computed: {
			...mapGetters(['labelList']),
			myLabelList() {
				return this.labelList.filter(item => this.labelIds.includes(item._id));
			},
			recommendedLabelList() {
				return this.labelList.filter(item => !this.labelIds.includes(item._id) && item._id);
			}
		},
		methods: {
			// 编辑按钮事件
			startEdit() {
				this.isEdit && this._updateLabel();
				this.isEdit = !this.isEdit;
			},
			deleteLabel(label) {
				this.labelIds = this.labelIds.filter(item => item !== label._id);
			},
			addLabel(label) {
				if (!this.isEdit) return
				this.labelIds.push(label._id);
			},
			// 修改标签
			async _updateLabel() {
				const res = await this.$api.updateLabel({
					userId: this.userInfo.userInfo._id,
					label_ids: this.labelIds
				});
				this.$store.commit('userInfo/setUserInfo',{...this.userInfo.userInfo,label_ids: this.labelIds})
				uni.showToast({
					title:res.msg,
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./css/label.scss";
</style>
