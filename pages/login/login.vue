<template>
	<view class="login-container">
		<image src="../../static/img/login_bg.png" class="banner-bg" mode=""></image>
		<!-- 导航 -->
		<view class="login-nav">
			<view class="nav-item" :class="{'active':type==='account'}" @click="chageLoginType('account')">
				账号登录
			</view>
			<view class="nav-item" :class="{'active':type !=='account'}" @click="chageLoginType('phone')">
				手机登录 
			</view>
		</view>
		<!-- 表单部分 -->
		<uni-forms class="form" ref="form" :modelValue="formData" >
			<view class="" v-if="type ==='account'">
				<uni-forms-item label="账号" name="loginName">
					<uni-easyinput placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入账号" v-model="formData.loginName" :inputBorder="false"/>
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput placeholder-class="placeholder" class="form-input" type="password" placeholder="请输入密码" v-model="formData.password" :inputBorder="false"/>
				</uni-forms-item>
			</view>
			<view class="" v-else>
				<uni-forms-item label="手机号" name="phone">
					<!-- #ifndef MP-WEIXIN  -->
					<uni-easyinput placeholder-class="placeholder" class="form-input" type="number" placeholder="请输入手机号" v-model="formData.phone" :inputBorder="false"/>
					<!-- #endif -->
					
					<!-- #ifdef MP-WEIXIN -->
					<input placeholder-class="placeholder" class="form-input" type="number" placeholder="请输入手机号" v-model="formData.phone" />
					<!-- #endif -->
				</uni-forms-item>
				<uni-forms-item label="验证码" name="vCode">
					<!-- #ifndef MP-WEIXIN  -->
					<uni-easyinput placeholder-class="placeholder" class="form-input" type="text" placeholder="验证码" v-model="formData.vCode" :inputBorder="false"/>
					<!-- #endif -->
					
					<!-- #ifdef MP-WEIXIN -->
					<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入密码" v-model="formData.vCode" />
					<!-- #endif -->
					<SendCode class="code-component" @sendPhoneCode='phoneCode=$event'  @getForm='getForm'></SendCode>
				</uni-forms-item>
			</view>
			
			<button class="login-btn" @click="submitForms">立即登录</button>
		</uni-forms>
		<view class="footer-select-container">
			<text>注册</text>
			<text>忘记密码</text>
		</view>
		<view style="color:red;text-align: center;margin-top: 120rpx;" v-if="phoneCode">验证码：{{phoneCode}}</view>
	</view>
</template>

<script>
	// import {mapMutations} from 'vuex'
	export default {
		onReady(){
			this.$refs.form.setRules(this.formRules)
		},
		data() {
			return {
				type:'account',
				formData:{
					loginName:'',
					password:'',
					phone:"",
					vCode:'',
				},
				phoneCode:''
			}
		},
		methods: {
			async submitForms(){
				const formInfo = await this.$refs.form.validate();
				this.getUserInfo(formInfo);
			},
			chageLoginType(type){
				this.type = type;
				this.$refs.form.clearValidate([])
			},
			async getUserInfo(formInfo){
				const res = await this.$api.getUserInfo({...formInfo,type:this.type});
				this.$store.commit('userInfo/setUserInfo',res[0]);
				res && uni.showToast({
					title: '登录成功',
					icon:'none'
				});
				setTimeout(()=>{
					// #ifdef H5
						uni.switchTab({
							url:'../index/index'
						})
					// #endif
					// #ifndef H5
					uni.navigateBack({})
					// #endif
				},1500)
			},
			getForm(cb){
				cb && cb(this.$refs.form.validateField)
			},
			// ...mapMutations(['setUserInfo'])
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
</style>

<style lang="scss" scoped>
@import  './css/login.scss'
</style>
