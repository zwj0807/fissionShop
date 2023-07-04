<template>
	<view>
		<view style="height: 168rpx;">
			<view class="nav_top">
				<view class="text">我的</view>
			</view>
		</view>
		<view class="personage_info">
			<image class="img" src="../../static/touxinag_demo.jpg"></image>
			<view class="txt">葫芦小金刚</view>
		</view>
		<view class="order_box">
			<view class="order_title_line">
				<view class="order_title">我的订单</view>
				<view class="order_all">查看全部 > </view>
			</view>
			<view class="order_state">
				<view class="state_item">
					<view class=""><u-icon name="bag" size="60" color="#df464b"></u-icon></view>
					<view class="txt">待自提</view>
				</view>
				<view class="state_item">
					<view class=""><u-icon name="order" size="60" color="#df464b"></u-icon></view>
					<view class="txt">已完成</view>
				</view>
			</view>
		</view>
		<view class="red_packet">
			<view class="my_red">
				<text style="font-size: 22rpx; color: #595959;margin-left: 50rpx;">我的红包余额：</text>
				<text style="font-size: 28rpx; color: #b9374b;margin-left: 14rpx;">120.00元</text>
				<text style="font-size: 22rpx; color: #b9374b;margin-left: 15rpx;">正在变大...</text>
				<view class="withdraw">去提现</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

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
}
</style>
