<template>
	<view style="height: 100vh; display: flex; align-items: center;">
		<!-- 微信授权登陆按钮 -->
		<view class="button_box">
			<u-button  type="success" open-type="getPhoneNumber" @getphonenumber="getphoneNumber">微信授权登陆</u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sessionKey:'',
				timer:null
			}
		},
		onLoad() {
	
		},
		computed:{
			
		},
		methods: {
			
			//用户授权登陆允许后，返回encryptedData, iv参数
			getphoneNumber(e) {
			    //拿到参数后进一步去解密....
			    // 授权通过后轮询等待获取sessionKey响应成功
			    // if (['getPhoneNumber:ok'].includes(e?.detail?.errMsg)) {
					  // this.handlePolling(e)
			    // }
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			/**
			* 轮询查询是否有sessionKey,防止初始化接口响应时间过长拿不到解密入参，用户解密失败
			*/
			handlePolling(e) {
			    this.timer = setInterval(() => {
			        if (this.sessionKey) {
			            this.decryptDataInfo(e.detail)
			            this.timer = null
			        }
			    }, 300)
			},
			/**
			  * 解密获取手机号码，区号
			  */
			async decryptDataInfo(detail) {
			    let params =  {
			        encryptedData: detail.encryptedData,
			        sessionKey: this.sessionKey,
			        iv: detail.iv,
			        appId: getLocalStorage(AppIdKey),
			    }
			 
			    let res = await decryptApi(params) 
			    if (res.success) {
			        //解密成功，获取到手机号码，区号等信息
			        let data = JSON.parse(res.data)
			        // 调用后端登陆接口传入信息,完成登陆
			        this.loginMinor(data)
			    } else {
			       //....异常处理
			    }
			}
		},
	}
</script>

<style lang="scss" scoped>
	.button_box{
		width: 686rpx;
		height: 96rpx;
		margin: -200rpx auto 0 auto;
	}
</style>