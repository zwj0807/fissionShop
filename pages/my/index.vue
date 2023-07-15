<template>
	<view>
		<view style="height: 168rpx;">
			<view class="nav_top">
				<view class="text">我的</view>
			</view>
		</view>
		<view class="personage_info">
			<image class="img" :src=" userInfo.avatar ? userInfo.avatar : '/static/touxinag_demo.jpg'"></image>
			<view class="txt">{{userInfo.nickname}}</view>
		</view>
		<view class="order_box">
			<view class="order_title_line">
				<view class="order_title">我的订单</view>
				<view class="order_all" @click="goOrder(0)">查看全部 > </view>
			</view>
			<view class="order_state">
				<view class="state_item" @click="goOrder(1)">
					<view class=""><u-icon name="bag" size="60" color="#df464b"></u-icon></view>
					<view class="txt">待自提</view>
				</view>
				<view class="state_item" @click="goOrder(2)">
					<view class=""><u-icon name="order" size="60" color="#df464b"></u-icon></view>
					<view class="txt">已完成</view>
				</view>
			</view>
		</view>
		<view class="red_packet">
			<view class="my_red">
				<text style="font-size: 22rpx; color: #595959;margin-left: 50rpx;">我的红包余额：</text>
				<text style="font-size: 28rpx; color: #b9374b;margin-left: 14rpx;">{{userInfo.money}}元</text>
				<text style="font-size: 22rpx; color: #b9374b;margin-left: 15rpx;">正在变大...</text>
				<view class="withdraw" @click="goWithdraw">去提现</view>
			</view>
			<view class="activity_text">
				活动还有{{dateArr[0]}}天{{dateArr[1]}}小时{{dateArr[2]}}分{{dateArr[3]}}秒结束
			</view>
		</view>
		<view class="record" >
			<view class="record_item" v-for="(item,index) in menuList" :key="index" @click="goMenu(item)">
				<u-icon :name="item.iconName" size="70" color="#ee9a3a"></u-icon>
				<view class="txt">{{item.name}}</view>
			</view>
		</view>
		<view class="menu" :class="{'menu_top': index>0 }" v-for="(item,index) in list" :key="index" @click="goPage(item)">
			<view class="txt">{{item.name}}</view>
			<view class="icon"><u-icon name="arrow-right" size="30"></u-icon></view>
		</view>
	</view>
</template>

<script>
import { product_details } from '@/api/index.js'
import { mapGetters } from  'vuex'
	export default {
		data() {
			return {
				list:[
					{
						name:'切换店铺',
						url:'/my/changeMerchant'
					},
					{
						name:'红包攻略',
						url:''
					},
					{
						name:'投诉和建议',
						url:''
					},
					// {
					// 	name:'绑定手机号',
					// 	url:''
					// },
					{
						name:'设置',
						url:'setting'
					}
				],
				menuList:[
					{
						name:'邀请记录',
						url:'/my/inviteRecord',
						iconName:'file-text-fill',
						
					},
					{
						name:'红包记录',
						url:'/my/redRecord',
						iconName:'file-text',
						
					},
					{
						name:'提现记录',
						url:'/other/withdraw/record',
						iconName:'red-packet-fill',
						
					},
					{
						name:'分享朋友圈',
						url:'/my/shareFriend',
						iconName:'moments',
						
					}
				],
				dateArr:['00','00','00','00'],
				proInfo:{}
			}
		},
		onLoad() {

		},
		onShow() {
			this.getproductDetails()
		},
		onPullDownRefresh() {
			this.getproductDetails()
			setTimeout(function () {
				uni.stopPullDownRefresh()
			}, 500)
		},
		computed:{
			...mapGetters(['userInfo','proid']),
		},
		methods: {
			goOrder(index){
				uni.navigateTo({
					url: `/my/order?type=${index}`
				})
			},
			goMenu(item){
				uni.navigateTo({
					url: item.url
				})
			},
			goWithdraw(){
				uni.navigateTo({
					url:'/other/withdraw/index'
				})
			},
			goPage(item){
				if(item.url==''){
					this.$util.toast('尽请期待')
					return false
				}
				if(item.url=='setting'){
					uni.openSetting({
					  success(res) {
					    console.log(res.authSetting)
					  }
					});
					return false
				}
				uni.navigateTo({
					url: item.url
				})
			},
			getproductDetails(){
				let params={
					id:this.proid
				}
				product_details(params).then(res=>{
					this.proInfo=res.data
					if(this.proInfo.limited_status){
						this.down()
					}
				})
			},
			down(){
				let timer= setInterval(()=>{
					this.dateArr= this.$util.cutDownDate(this.$util.parseTime(this.proInfo.limited_time))
					if(this.dateArr[4]=='-1'){ //倒计时结束
						this.dateArr=['00','00','00','00','-1']
						clearInterval(timer)
					}
				},1000)
			},

		}
	}
</script>

<style lang="scss" scoped>
.nav_top{
	width: 100%;
	height: 168rpx;
	// background-color: #f7d7cf;
	background-image: linear-gradient(to right,#e57b47,#d73155);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
	.text{
		font-size: 30rpx;
		color: #fff;
		margin-top: 88rpx;
	}
}
.personage_info{
	height: 200rpx;
	background-image: linear-gradient(to right,#eb8a5f,#dd395b);
	display: flex;
	align-items: center;
	.img{
		width: 125rpx;
		height: 125rpx;
		border-radius: 50%;
		margin-left: 28rpx;
	}
	.txt{
		font-size: 28rpx;
		color: #fff;
		margin-left: 20rpx;
	}
}
.order_box{
	height: 274rpx;
	background-color: #fff;
	.order_title_line{
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 28rpx;
		border-bottom: 1rpx solid #efefef;
		.order_title{
			font-size: 29rpx;
			color: #393939;
		}
		.order_all{
			color: #7b7b7b;
			font-size: 22rpx;
		}
	}
	.order_state{
		height: 173rpx;
		margin: 0 28rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.state_item{
			width: 80rpx;
			margin: 0 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.txt{
				font-size: 24rpx;
				color: #6b6b6b;
				margin-top: 10rpx;
			}
		}
	}
}
.red_packet{
	height: 186rpx;
	background-image: linear-gradient(to bottom, #d82f58,#ec635d);
	overflow: hidden;
	.my_red{
		height: 90rpx;
		background-color: #fff;
		border-radius: 90rpx;
		margin: 22rpx 30rpx;
		display: flex;
		align-items: center;
			
		.withdraw{
			width: 132rpx;
			height: 50rpx;
			background-color: #ffe3e9;
			border: 1rpx solid #e53667;
			text-align: center;
			line-height: 50rpx;
			font-size: 26rpx;
			margin-left: 68rpx;
			border-radius: 50rpx;
			color: #b9374b;
		}
	}
	.activity_text{
		margin-top: 10rpx;
		text-align: center;
		font-size: 30rpx;
		color: #ececec;
	}
}
.record{
	height: 195rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
	.record_item{
		width: 135rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 30rpx;
		.txt{
			width: 100%;
			font-size: 26rpx;
			color: #626262;
			text-align: center;
		}
	}
}
.menu{
	height: 110rpx;
	background-color: #fff;
	padding: 0 24rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.txt{
		color: #292929;
		font-size: 30rpx;
	}
}
.menu_top{
	border-top: 1rpx solid #eeeeee;
}
</style>
