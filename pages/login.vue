<template>
	<view style="height: 100vh; display: flex;flex-direction: column; justify-content: center; align-items: center;">
		<image class="head_img" :src="defaultAvatarUrl"></image>
		<view class="nick_input" v-if="avurl">
			<input style="text-align: center; border: 1rpx solid #003153;height: 100%;line-height: 100rpx;border-radius: 12rpx;" v-model="nickname"  type="nickname" placeholder="请输入昵称" id="nickname-input"/>
		</view>
		<image class="img" src="../static/login.png"></image>
		<!-- 微信授权登陆按钮 -->
		<view class="button_box">
			<button class="login_button" v-if="!avurl" open-type="chooseAvatar" @chooseavatar="chooseAvatar">微信授权登陆</button>
			<u-button v-if="avurl" type="success" @click="gouser">登录</u-button>
		</view>

	</view>
</template>

<script>
	import {
		login_weixin,
		getuserphonenumber,
		uploadImgName
	} from '@/api/index.js'
	import {
		getToken
	} from '@/utils/auth'
	import {
		mapGetters
	} from 'vuex'
	import WXBizDataCrypt from "@/utils/WXBizDataCrypt.js" //解密手机号信息
	export default {
		data() {
			return {
				avurl: false,
				defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickname: '',
				subshow: false,
				uid:''
			}
		},
		onLoad(options) {
			let token = getToken()
			if (options.state) {

			} else {
				if (token) {
					// uni.reLaunch({
					// 	url: `/pages/index/index`
					// })
				}
			}
		},
		onShow() {
			this.init()
		},
		computed: {
			...mapGetters(['userInfo', 'proid']),
		},
		methods: {
			gouser() {
			let that =this
			uni.createSelectorQuery().in(this) // 注意这里要加上 in(this)
				.select("#nickname-input")
				.fields({
					properties: ["value"],
				})
				.exec((res) => {
					that.nickname = res?.[0]?.value ?? ''
					setTimeout(()=>{
						console.log('nick',this.nickname,res)
						if (this.nickname.trim().length==0) {
							uni.showToast({
								title: '请输入昵称！',
								icon: 'none'
							});
							return
						}
						let avatar=null
						uni.getFileSystemManager().readFile({
						      filePath: that.defaultAvatarUrl,
						      encoding: 'base64',
						      success: function(resimg) {
						        console.log('data:image/png;base64,' + resimg.data)
								avatar=resimg.data
								
								let params = {
									nickname: that.nickname,
									avatar: avatar,
									uid:that.uid
								};
								console.log(params)
								uploadImgName(params).then(res=>{
									uni.reLaunch({
										url: `/pages/index/index`
									})
								}).catch(err=>{
									this.$util.toast('登录失败，请联系管理员！')
								})
						      }
						})
						
					},100)
				})
			},
				async init() {
						let res = await this.login()
						if (['login:ok'].includes(res.errMsg)) {
							login_weixin({
								platform: 'wechat',
								code: res.code
							}).then(res => {
								let token = res?.data?.userinfo?.token ?? ''
								let uid = res?.data?.userinfo?.id ?? ''
								
								this.uid= uid
								console.log('uid',res)
								// let token='d774dc00-01ca-4b85-bf57-9393282b9597'
								this.$store.commit('SET_TOKEN', token)
								// console.log('openid', res.data.openid)
								// this.$store.commit('SET_TOKEN', token)
							}).catch(err => {
								console.log(err)
							})
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
					chooseAvatar(e) {
						console.log('头像',e)
						this.defaultAvatarUrl = e.detail.avatarUrl

						this.avurl = true
					}
			},
		}
</script>
<style>
	page{
		background-image: linear-gradient(45deg ,#fff,#f2c4b4);
	}
</style>
<style lang="scss" scoped>
	.head_img {
		width: 100rpx;
		height: 100rpx;
		margin-top: -510rpx;
		border-radius: 50%;
		border: 2rpx solid #e3e3e3;
	}

	.nick_input {
		width: 380rpx;
		height: 100rpx;
		margin-top: 30rpx;
		
	}

	.img {
		width: 200rpx;
		height: 236rpx;
		margin-top: 30rpx;
	}

	.button_box {
		width: 686rpx;
		height: 96rpx;
		margin: 90rpx auto 0 auto;
		.login_button{
			background-color: #5ac725;
			color: #fff;
		}
	}

</style>