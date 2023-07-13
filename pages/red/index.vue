<template>
	<view>
		<view class="bg">
			<view class="red_top_box">
				<image class="head_box" :src=" userInfo.avatar ? userInfo.avatar : '/static/touxinag_demo.jpg' "></image>
				<view class="withdraw" @click="goWithdraw">提现</view>
				<view class="my_money" >我的金额</view>
				<view class="money_txt"><text>￥</text>{{userInfo.money}}</view>
				<view class="progress_box">
					<view class="progress_top_txt">
						<view>0</view>
						<view>{{userInfo.withdrawal_amount}}</view>
					</view>
					<view class="progress">
						<u-line-progress :percentage="percentage" height="25rpx" :showText="false" activeColor="#f6cb57" inactiveColor="#a5231a"></u-line-progress>
					</view>
				</view>
				<view class="rule">满{{userInfo.withdrawal_amount}}元即可提现</view>
				<view class="red_button" @click="goShare">让红包变大</view>
			</view>
			<!-- 弹幕滚动前三提现信息 -->
			<view class="subtitle_box" v-show="withdrawal.length >0">
				<view class="subtitle_item item_1" v-show="withdrawal[0]">
					<image class="head" :src="withdrawal[0].avatar ? withdrawal[0].avatar : '/static/touxinag_demo.png'"></image>
					<text class="txt">{{withdrawal[0].nickname}}  &nbsp; 又提现了{{withdrawal[0].money}}元</text>
				</view>
				<view class="subtitle_item item_2" v-show="withdrawal[1]">
					<image class="head" :src="withdrawal[1].avatar ? withdrawal[1].avatar : '/static/touxinag_demo.png'"></image>
					<text class="txt">{{withdrawal[1].nickname}}  &nbsp; 又提现了{{withdrawal[1].money}}元</text>
				</view>
				<view class="subtitle_item  item_3" v-show="withdrawal[2]">
					<image class="head" :src="withdrawal[2].avatar ? withdrawal[2].avatar : '/static/touxinag_demo.png'"></image>
					<text class="txt">{{withdrawal[2].nickname}}  &nbsp; 又提现了{{withdrawal[2].money}}元</text>
				</view>
			</view>
			<view class="red_list_box">
				<view class="title">
					<view :class="{'checked_title' : checkedTitleNum!==0}" @click="changeTitle(0)">红包排行榜</view>
					<view style="background-color: #fffeba; width: 1rpx;height: 40rpx;"></view>
					<view :class="{'checked_title' : checkedTitleNum!==1}" @click="changeTitle(1)">我的邀请进展</view>
				</view>
				<!-- 红包排行 - 自己 -->
				<view class="item_box oneself" v-if="checkedTitleNum==0">
					<view class="icon"><u-icon name="gift-fill" color="#f8d950" size="50"></u-icon></view>
					<image class="head" :src="current.avatar ? current.avatar : '/static/touxinag_demo.png'"></image>
					<view class="info">
						<view class="name">{{current.nickname}}</view>
						<view class="ranking">第{{current.rank}}名</view>
					</view>
					<view class="money_box">
						{{current.total_amount}}元
						<view class="money_icon">
							<u-icon name="rmb-circle" color="#f7d458" size="50"></u-icon>
						</view>
					</view>
				</view>
				<!-- 红包排行 -->
				<view style="height: 805rpx; overflow-y: auto;" v-if="checkedTitleNum==0">
					<view class="item_box " :class="{'top_line': index > 0}" v-for="(item,index) in all" :key="item.id">
						<view class="icon">{{index+1}}</view>
						<image class="head" :src="item.avatar ? item.avatar : '/static/touxinag_demo.png'"></image>
						<view class="info">
							<view class="name">{{item.nickname}}</view>
						</view>
						<view class="money_box">
							{{item.total_amount}}元
							<view class="money_icon">
								<u-icon name="rmb-circle" color="#f7d458" size="50"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<!-- 邀请进展 -->
				<view style="height: 805rpx; overflow-y: auto; margin-top: 20rpx;" v-if="checkedTitleNum==1">
					<view class="item_box " :class="{'top_line': index > 0}" v-for="(item,index) in inviteList" :key="item.id">
						<view class="icon">{{index+1}}</view>
						<image class="head" :src="item.avatar ? item.avatar : '/static/touxinag_demo.png'"></image>
						<view class="info">
							<view class="name">{{item.nickname}}</view>
						</view>
						<view class="money_box">
							{{item.status}}
							<view class="money_icon">
								<u-icon name="weixin-circle-fill" color="#f7d458" size="50"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="merchant">
				<view class="merchant_title">红包提供方</view>
				<view class="merchant_box">
					<image class="merchant_img" :src="product.shop.image ? product.shop.image : '/static/touxinag_demo.png'"></image>
					<view class="merchant_info">
						<view class="name">{{product.shop.name}}</view>
						<view class="address">{{product.shop.address}}</view>
					</view>
					<view class="line"></view>
					<view class="phone" @click="callPhone(product.shop.tel)">
						<u-icon name="phone-fill" size="60" color="#f7f7f7"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { red_envelope } from '@/api/index.js'
	import { mapGetters } from  'vuex'
	export default {
		data() {
			return {
				checkedTitleNum:0,
				all:[],//所有用户信息排行
				current:{},//当前用户登录信息
				product:{},//产品信息
				withdrawal:[],//提现信息滚动
				inviteList:[],//邀请信息
			}
		},
		onLoad() {

		},
		onShow() {
			this.getRedList()
		},
		computed:{
			...mapGetters(['userInfo','proid']),
			percentage(){
				return this.userInfo.money / this.userInfo.withdrawal_amount * 100
			}
		},
		methods: {
			goShare(){
				uni.switchTab({
					url:'/pages/share/index'
				})
			},
			goWithdraw(){
				uni.navigateTo({
					url:'/other/withdraw/index'
				})
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
							console.log(res);
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
			changeTitle(index){
				this.checkedTitleNum=index
			},
			getRedList(){
				let params={
					id:this.proid
				}
				red_envelope(params).then(res=>{
					let { all, current, product, withdrawal,inviteList} =res.data
					this.all=all
					this.current=current
					this.product=product
					this.withdrawal=withdrawal
					this.inviteList=inviteList
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.bg{
	width: 100%;
	height: 2674rpx;
	background: url('https://www.jumidongli.com/template/pc/static/demoImg/fissionShop/redhot_bg.png') no-repeat;
	background-size: 100% 100%;
	.red_top_box{
		height: 920rpx;
		position: relative;
		.head_box{
			width: 82rpx;
			height: 82rpx;
			border-radius: 50%;
			border: 5rpx solid #fff;
			overflow: hidden;
			margin-top: 228rpx;
			margin-left: 50%;
			transform: translateX(-50%);
		}
		.withdraw{
			width: 90rpx;
			height: 48rpx;
			background-color: #f3e1cf;
			border-radius: 48rpx 0 0 48rpx;
			text-align: center;
			line-height: 48rpx;
			color: #894807;
			font-size: 26rpx;
			position: absolute;
			top: 290rpx;
			right: 167rpx;
		}
		.my_money{
			font-size: 24rpx;
			font-weight: 500;
			text-align: center;
			margin-top: 14rpx;
		}
		.money_txt{
			font-size: 70rpx;
			color: #c34438;
			text-align: center;
			margin-top: 28rpx;
			font-weight: 600;
			text{
				font-size: 40rpx;
				margin-right: 10rpx;
			}
		}
		.progress_box{
			width: 518rpx;
			height: 104rpx;
			margin: 160rpx auto 0 auto;
			.progress_top_txt{
				width: 408rpx;
				margin: 0 auto;
				color: #fff;
				font-size: 22rpx;
				display: flex;
				justify-content: space-between;
			}
			.progress{
				width: 450rpx;
				
				margin: 20rpx auto ;
			}
		}
		.rule{
			text-align: center;
			color: #f3f3f3;
			font-size: 25rpx;
		}
		.red_button{
			width: 360rpx;
			height: 74rpx;
			border-radius: 74rpx;
			background-color: #f7cf64;
			color: #e93230;
			font-size: 30rpx;
			font-weight: 600;
			line-height: 74rpx;
			text-align: center;
			margin: 25rpx auto;
			animation: heartbeat 2.5s ease-in-out infinite both;
		}
	}
	.subtitle_box{
		height: 210rpx;
		overflow: hidden;
		// background-color: rgba(163, 255, 65, 0.2);
		.subtitle_item{
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			padding: 10rpx 32rpx;
			height: 70rpx;
			border-radius: 70rpx;
			background-color: rgba(0, 0, 0, .3);
			
			position: relative;
			top: 0;
			left: 0;
			.head{
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				line-height: 40rpx;
				overflow: hidden;
			}
			.txt{
				font-size: 24rpx;
				color: #fff;
				margin-left: 28rpx;
			}
		}
		.item_1{
			left:-100%;
			animation: rowScrollTest 12s linear 0s infinite;
		}
		.item_2{
			left:-100%;
			animation: rowScrollTest 12s linear 4s infinite;
		}
		.item_3{
			left:-100%;
			animation: rowScrollTest 12s linear 8s infinite;
		}
		@keyframes rowScrollTest {
			from {
				left: 100%; 
			}
			to {
				left: -250%; 
			}
		}
	}
	.red_list_box{
		height: 1055rpx;
		// margin-top: 210rpx;
		.title{
			width: 80%;
			height: 100rpx;
			// text-align: center;
			color: #fffeba;
			font-size: 36rpx;
			line-height: 100rpx;
			font-weight: 600;
			margin: 0 auto;
			border-bottom: 1rpx solid #fffeba;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
		.checked_title{
			color: #d3d29a;
			font-weight: 500;
		}

		.item_box{
			width: 690rpx;
			height: 100rpx;
			border-radius: 20rpx;
			background-color: rgba(255, 255, 255, .2);
			margin: 0 auto;
			display: flex;
			align-items: center;
			.icon{
				width: 52rpx;
				margin-left: 50rpx;
				color: #562116;
				text-align: center;
			}
			.head{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin: 0 25rpx;
				overflow: hidden;
			}
			.info{
				width: 250rpx;
				.name{
					font-size: 24rpx;
					color: #562116;
				}
				.ranking{
					color: #894a3b;
					font-size: 19rpx;
					margin-top: 10rpx;
				}
			}
			.money_box{
				width: 180rpx;
				height: 50rpx;
				border-radius: 50rpx;
				background-color: #eb5053;
				font-size: 24rpx;
				color: #f3cbc2;
				text-align: center;
				line-height: 50rpx;
				margin-left: 25rpx;
				position: relative;
				.money_icon{
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					top: 0;
					left: -20rpx;
				}
			}
		}
		.oneself{
			margin-top: 20rpx;
			margin-bottom: 30rpx;
			.icon{
				margin-left: 50rpx;
			}
			
		}
		.top_line{
			border-top: 1rpx solid #edafab;
			margin-top: 10rpx;
		}
		.no_radius{
			border-radius: 0;
		}
	}
	.merchant{
		.merchant_title{
			font-size: 22rpx;
			color: #f3ca99;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
		}
		.merchant_box{
			width: 690rpx;
			height: 160rpx;
			margin: 20rpx auto 0 auto;
			border-radius: 20rpx;
			background-color: rgba(255, 255, 255, .2);
			display: flex;
			align-items: center;
			.merchant_img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 5rpx;
				margin-left: 20rpx;
				
			}
			.merchant_info{
				width: 450rpx;
				margin-left: 20rpx;
				.name{
					color: #fae8ac;
					font-size: 27rpx;
				}
				.address{
					height:55rpx;
					margin-top: 16rpx;
					color: #fae8ac;
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
				border-right: 1rpx solid #fae8ac;
			}
			.phone{
				    margin-left: 15rpx;
			}
		}
	}
}
@keyframes heartbeat {
	from {
			transform: scale(1);
			transform-origin: center center;
			animation-timing-function: ease-out;
	}
	10% {
			transform: scale(0.91);
			animation-timing-function: ease-in;
	}
	17% {
			transform: scale(0.98);
			animation-timing-function: ease-out;
	}
	33% {
			transform: scale(0.87);
			animation-timing-function: ease-in;
	}
	45% {
			transform: scale(1);
			animation-timing-function: ease-out;
	}
}

</style>