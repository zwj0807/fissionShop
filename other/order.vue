<template>
	<view>
		<view class="goods_box">
			<image class="img" :src=" proInfo.image[0] ? proInfo.image[0] : '../static/touxinag_demo.jpg'"></image>
			<view style="width: 400rpx;">
				<view class="txt">
					{{proInfo.name}}
				</view>
				<view class="txt_num">
					数量{{buyNum}}
				</view>
			</view>
			<view class="money">￥{{money}}</view>
			
		</view>
		<view class="merchant">
			<view class="merchant_title">提货地址</view>
			<view class="merchant_box">
				<image class="merchant_img" :src="proInfo.shop.image ? proInfo.shop.image : '/static/touxinag_demo.jpg'"></image>
				<view class="merchant_info">
					<view class="name">{{proInfo.shop.name}}</view>
					<view class="address">{{proInfo.shop.address}}</view>
				</view>
				<view class="line"></view>
				<view class="phone" @click="callPhone(proInfo.shop.tel)">
					<u-icon name="phone-fill" size="60" color="#a1a1a1"></u-icon>
				</view>
			</view>
		</view>
		<view class="lable_box">支付方式</view>
		<view class="payType">
			<view style="margin-left: 30rpx; display: flex;align-items: center;">
				<u-icon name="weixin-circle-fill" size="50" color="#04D168"></u-icon>
				<view style="margin-left: 30rpx;font-size: 26rpx;color: #191919;">微信支付</view>
			</view>
			<view style="margin-right: 32rpx;"><u-radio-group  v-model="value"><u-radio size="40" iconSize="40" name="1" shape="circle" ></u-radio></u-radio-group></view>
		</view>
<!-- 		<view class="lable_box">购买数量</view>
		<view class="buy_num">
			<view class="buy_num_box">
				<view class="minus" @click="numMinus"><u-icon size="40" name="minus-circle" ></u-icon></view>
				<view class="input"><u-input v-model.number="buyNum" inputAlign="center" type="number" border="none" :disabled="true"></u-input></view>
				<view class="plus" @click="numPlus"><u-icon size="40" name="plus-circle"></u-icon></view>
			</view>
		</view> -->
		<view class="lable_box">提货手机号</view>
		<view class="phone_num">
			<u-input  v-model="buyPhone" placeholder="请输入提货手机号" type="number" border="none"></u-input>
		</view>
		<view style="height: 110rpx;">
			<view class="tabbar_box">
				<view class="tabar_left">
					￥{{money}}元
				</view>
				<view class="tabar_right" @click="subPay">
					支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { place_order,product_details } from '@/api/index.js'
	import { mapGetters } from  'vuex'
	export default {
		data() {
			return {
				value:'1',
				buyNum:1,//购买数量
				buyPhone:'',//购买手机号
				proInfo:{},//产品信息
			}
		},
		onLoad() {

		},
		computed: {
			...mapGetters(['userInfo','proid']),
			money(){
				return parseFloat(this.buyNum) * this.proInfo.price_text
			}
		},
		onShow() {
			this.getproductDetails()
		},
		methods: {
			numMinus(){
				if(!isNaN(this.buyNum) && this.buyNum > 1){
					this.buyNum--
				}
			},
			numPlus(){
				if(!isNaN(this.buyNum)){
					this.buyNum++
				}
			},
			callPhone(item){
				let phone = item; // 需要拨打的电话号码
				console.log('拨打电话', phone)
				const res = uni.getSystemInfoSync();
				// ios系统默认有个模态框
				if (res.platform == 'ios') {
					 uni.makePhoneCall({
						phoneNumber: phone,
						success() {
							console.log('ios拨打成功了');
						},
						fail() {
							console.log('ios拨打失败了');
						}
					})
				} else {
					//安卓手机手动设置一个showActionSheet
					uni.showActionSheet({
						itemList: [phone, '呼叫'],
						success: function(res) {
							if (res.tapIndex == 1) {
								uni.makePhoneCall({
									phoneNumber: phone,
									success() {
										console.log('安卓拨打成功了');
									},
									fail() {
										console.log('安卓拨打失败了');
									}
								})
							}
						}
					})
				}
			},
			subPay(){
				if(Array.isArray(this.buyNum) || this.buyNum <1){
					this.$util.toast('购买数量填写错误')
					return false
				}
				if(!this.$util.verifyMobile(this.buyPhone)){
					this.$util.toast('提货手机号填写错误')
					return false
				}
				let params={
					id:this.proid,
					money:this.money,
					mobile:this.buyPhone,
					unit: this.buyNum
				}
				place_order(params).then(res=>{
					let obj = res.data || {}
						//调用微信官方支付接口弹出付款界面,输入密码扣款
						wx.requestPayment({
							timeStamp: obj.timeStamp,  //后端返回的时间戳
							nonceStr:  obj.nonceStr,   //后端返回的随机字符串
							package:  obj.package, //后端返回的prepay_id
							signType: 'MD5', //后端签名算法,根据后端来,后端RSA这里即为RSA
							paySign:  obj.paySign,  //后端返回的签名
							success (res) {
								console.log('用户支付扣款成功', res)
								// if(res.errMsg=='requestPayment:ok'){
									// this.$util.toast('购买成功')
									// setTimeout(()=>{
										wx.switchTab({
											url:'/pages/index/index'
										})
									// },1000)
								// }
							},
							fail (err) { 
								this.$util.toast('支付失败')
								console.log('用户支付扣款失败', err)
							}
						})
					
				}).catch((err)=>{
					this.$util.toast(err.msg)
				})
			},
			getproductDetails(){
				let params={
					id:this.proid
				}
				product_details(params).then(res=>{
					this.proInfo=res.data
					this.proInfo.image=this.proInfo.image.split(',')
				})
			},
		}
	}
</script>


<style lang="scss" scoped>
.goods_box{
	height: 230rpx;
	background-color: #fff;
	margin-top: 27rpx;
	display: flex;
	.img{
		width: 178rpx;
		height: 178rpx;
		border-radius: 12rpx;
		margin: auto 28rpx;
	}
	.txt{
		margin-top: 50rpx;
		font-size: 30rpx;
		color: #000;
	}	
	.txt_num{
		font-size: 24rpx;
		margin-top: 80rpx;
		color: #979797;
	}
	.money{
		font-size: 24rpx;
		margin-top: 166rpx;
		color: #979797;
	}
}
	.merchant{
		.merchant_title{
			font-size: 26rpx;
			color: #191919;
			margin-top: 20rpx;
			margin-left: 32rpx;
		}
		.merchant_box{
			// width: 690rpx;
			height: 160rpx;
			margin: 20rpx auto 0 auto;
			// border-radius: 20rpx;
			background-color: rgba(255, 255, 255, 1.0);
			display: flex;
			align-items: center;
			.merchant_img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 5rpx;
				margin-left: 32rpx;
				
			}
			.merchant_info{
				width: 450rpx;
				margin-left: 20rpx;
				.name{
					color: #000;
					font-size: 27rpx;
				}
				.address{
					height:55rpx;
					margin-top: 16rpx;
					color: #000;
					font-size: 22rpx;
					 word-break: break-all;
					  text-overflow: ellipsis;
					  display: -webkit-box;
					  -webkit-box-orient: vertical;
					  -webkit-line-clamp: 2; /* 超出几行省略 */
					  overflow: hidden;
				}
			}
			.line{
				width: 1rpx;
				height: 60rpx;
				border-right: 1rpx solid #2b2b2b;
			}
			.phone{
				    margin-left: 35rpx;
			}
		}
	}
	.lable_box{
		margin: 20rpx 32rpx;
		font-size: 26rpx;
		color: #191919;
	}
	.payType{
		height: 104rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.buy_num{
		height: 104rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.buy_num_box{
			margin-right: 32rpx;
			display: flex;
			align-items: center;
			.input{
				width: 90rpx;
				background-color: #d6d6d6;
				border-radius: 15rpx;
				margin: 0 15rpx;
			}
		}
	}
	.phone_num{
		height: 104rpx;
		background-color: #fff;
		padding: 0 32rpx;
		/deep/.u-input.data-v-fdbb9fe6{
			height: 100% !important;
		}
	}
	.tabbar_box{
		width: 100%;
		height: 110rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		z-index: 999;
		.tabar_left{
			width: 50%;
			height: 110rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #ec6238;
			
		}
		.tabar_right{
			width: 50%;
			height: 110rpx;
			background-image: linear-gradient(to right,#e9a456,#ec6238);
			color: #fff;
			line-height: 110rpx;
			font-size: 33rpx;
			text-align: center;
		}
	}

</style>
