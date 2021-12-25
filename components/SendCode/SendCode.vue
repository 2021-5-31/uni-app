<template>
	<view class="code-container">
		<view class="vCode-btn" @click="getForm">
			{{runTime?`${time}s后重新获取`:'获取验证码'}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "SendCode",
		data() {
			return {
				timer:null,
				time:60,
				runTime:false
			};
		},
		methods: {
			getForm(){
				if(this.runTime) return
				this.$emit('getForm',this.sendCode)
			},
			async sendCode(validateField) {
				const {phone} = await validateField(['phone'])
				this.runTime = true;
				this.timer = setInterval(()=>{
					if(this.time === 1){
						clearInterval(this.timer);
						this.time = 60;
						this.runTime = false;
						this.timer = null;
						return
					}
					this.time--;
				},1000)
				const phoneCode = await this.$api.getPhoneCode({phone});
				uni.showToast({
					title: '发送成功',
					icon:'none'
				});
				this.$emit('sendPhoneCode',phoneCode)
			}
		},
		beforeDestroy(){
			clearInterval(this.timer);
			this.time = 10;
			this.runTime = false;
			this.timer = null;
		}
	}
</script>

<style lang="scss">
	.code-container {
		flex-shrink: 0;
		margin-right: 20rpx;

		.vCode-btn {
			background-color: $base-color;
			color: #FFFFFF;
			padding: 20rpx;
			border-radius: 10rpx;
			opacity: .8;
		}
	}
</style>
