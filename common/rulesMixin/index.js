export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					phoneReg:/^1[3-9]\d{9}$/,
					formRules: {
						loginName: {
							rules: [{
								required: true,
								errorMessage: '请输入账号'
							}]
						},
						password: {
							rules: [{
								required: true,
								errorMessage: '请输入密码'
							}]
						},
						phone: {
							rules: [
								{
								required: true,
								errorMessage: '请输入手机号'
							},
							{
								validateFunction:this.validatePhone
							}
							]
						},
						vCode: {
							rules: [
								{
								required: true,
								errorMessage: '请输入验证码'
							},
							{
								validateFunction:this.validateCode
							}
							]
						}
					}
				}
			},
			methods: {
				validatePhone(rule,val,data,callback) {
					if(this.phoneReg.test(val)){
						callback();
					}else{
						callback('手机号不正确')
					}
				},
				validateCode(rule,val,data,callback) {
					if(val === this.phoneCode){
						callback();
					}else{
						callback('验证码错误')
					}
				},
			},
		})
	}
}
