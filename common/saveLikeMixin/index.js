import {
	mapState
} from "vuex"
export default {
	install(Vue) {
		Vue.mixin({

			data() {
				return {

				}
			},
			computed: {
				...mapState(['userInfo'])
			},
			methods: {
				isLogin() {
					return new Promise((resolve) => {
						if (this.userInfo.userInfo) {
							resolve()
						} else {
							uni.navigateTo({
								url: '../../pages/login/login'
							})
						}
					})
				}
			}
		})
	}
}
