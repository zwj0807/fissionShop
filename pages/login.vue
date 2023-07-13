<template>
	<view style="height: 100vh; display: flex;flex-direction: column; justify-content: center; align-items: center;">
		<image class="img" src="../static/login.jpg"></image>
		<!-- 微信授权登陆按钮 -->
		<view class="button_box">
			<!-- <u-button  type="success" open-type="getPhoneNumber" @getphonenumber="getphoneNumber">微信授权登陆</u-button> -->
			<u-button  type="success"  @click="init">微信授权登陆</u-button>
		</view>
		
	</view>
</template>

<script>
	import { login_weixin ,getuserphonenumber} from '@/api/index.js'
	import { mapGetters } from  'vuex'
	import WXBizDataCrypt from "@/utils/WXBizDataCrypt.js"
	export default {
		data() {
			return {
				openId:'',
			}
		},
		onLoad() {
			
		},
		computed: {
			...mapGetters(['userInfo','proid']),
		},
		methods: {
			async init() {
			    let res = await this.login()
			    if ( ['login:ok'].includes(res.errMsg)) {
					//获取openid
			        // login_weixin({ platform:'wechat' , code: res.code }).then(res=>{
						// let { thirdinfo } = res.data
						// this.openId = thirdinfo.openid
						let token='d774dc00-01ca-4b85-bf57-9393282b9597'
						// this.$store.commit('SET_TOKEN', res.userinfo.token)
						this.$store.commit('SET_TOKEN', token)
						uni.reLaunch({
							url:`/pages/index/index?id=${1}`
						})
					// })
			    } else {
			        //异常处理，再次发起请求或者抛出异常
					this.$util.toast('获取登录失败，请联系管理员！')
			    }
			},
			//封装微信获取用户code，避免嵌套
			login() {
			    return new Promise((resolve, reject) => {
			        uni.login({
			            success(res) {
			                resolve(res);
			            },
			            fail(err) {
			                reject(err);
			            }
			        })
			    })
			},
		},
	}
</script>

<style lang="scss" scoped>
	.img{
		width: 300rpx;
		height: 300rpx;
		margin-top: -400rpx;
	}
	.button_box{
		width: 686rpx;
		height: 96rpx;
		margin: 90rpx auto 0 auto;
	}
</style>