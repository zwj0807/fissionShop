<template>
	<view>
		<view class="task_box">
			<view class="task_title">做任务，让红包金额变大</view>
			<view class="task_detail">还差{{saveMoney}}元即可提现{{userInfo.withdrawal_amount}}元</view>
		</view>
		<view class="task_item_box">
			<view class="icon_box">
				<u-icon name="bag-fill" size="50" color="#fbf4f6"></u-icon>
			</view>
			<view class="task_name_box">
				<view class="name_title">购买商品 <text style="color: #e9838a;margin-left: 30rpx;">+30元</text></view>
				<view class="name_detail">自己购买，下单立得30元</view>
			</view>
			<view class="button" @click="goBuy">购买</view>
		</view>
		
		<view class="task_item_box">
			<view class="icon_box">
				<u-icon name="man-add-fill" size="50" color="#fbf4f6"></u-icon>
			</view>
			<view class="task_name_box">
				<view class="name_title">好友下单 <text style="color: #e9838a;margin-left: 30rpx;">+30元</text></view>
				<view class="name_detail">好友下单，Ta得30元，你得30元</view>
			</view>
			<button open-type="share">
			<view class="button">邀请</view>
			</button>
		</view>
		<view class="task_item_box">
			<view class="icon_box">
				<u-icon name="moments-circel-fill" size="50" color="#fbf4f6"></u-icon>
			</view>
			<view class="task_name_box">
				<view class="name_title">分享朋友圈 <text style="color: #e9838a;margin-left: 30rpx;">+30元</text></view>
				<view class="name_detail">保存海报分享朋友圈，好友下单，你的30元</view>
			</view>
			<view class="button" @click="goshare">去分享</view>
		</view>
		<!-- <view class="task_item_box">
			<view class="icon_box">
				<u-icon name="bell-fill" size="50" color="#fbf4f6"></u-icon>
			</view>
			<view class="task_name_box">
				<view class="name_title">结果通知我</view>
				<view class="name_detail">授权一次，可获取一条消息通知，建议勾选总是保持以上选择</view>
			</view>
			<view class="button">去授权</view>
		</view> -->
	</view>
</template>

<script>
	import { mapGetters } from  'vuex'
	export default {
		data() {
			return {
				
			}
		},
		onShareAppMessage(res) {
		    return {
		      title: '商美A客',
		      path: `/pages/index/index?id=${1}`,
		      // imageUrl: '/static/imgs/mylogo.png'
		    }
		},
		onLoad() {

		},
		computed: {
			...mapGetters(['userInfo','proid']),
			saveMoney(){
				let num = parseFloat(this.userInfo.withdrawal_amount) - parseFloat(this.userInfo.money)
				if(Math.sign(num)== -1){
					return 0
				}else{
					return num
				}
			}
		},
		methods: {
			goBuy(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			goshare(){
				uni.navigateTo({
					url:'/my/shareFriend'
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #fcfae7;
	}
</style>
<style lang="scss" scoped>
	button {
	    margin: unset;
	    padding: unset;
	}
	button:after {
		border: unset;
	}
.task_box{
	height: 170rpx;
	width: 690rpx;
	margin: 30rpx auto;
	background-image: linear-gradient(to right,#e57c47,#d83356);
	border-radius: 15rpx;
	overflow: hidden;
	.task_title{
		font-size: 48rpx;
		color: #fff;
		text-align: center;
		margin-top: 28rpx;
	}
	.task_detail{
		font-size: 26rpx;
		color: #faecee;
		text-align: center;
		margin-top: 34rpx;
	}
}
.task_item_box{
	width: 686rpx;
	height: 120rpx;
	background-color: #fff;
	border-radius: 12rpx;
	margin: 24rpx auto 0 auto;
	display: flex;
	align-items: center;
	.icon_box{
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
		background-color: #e87556;
		background: radial-gradient(circle farthest-side at top left,#fff, #fd695d);
		margin-left: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.task_name_box{
		width: 380rpx;
		margin-left: 32rpx;
		.name_title{
			font-size: 26rpx;
			color: #555555;
		}
		.name_detail{
			font-size: 22rpx;
			color: #838383;
			margin-top: 12rpx;
		}
	}
	.button{
		width: 140rpx;
		height: 54rpx;
		background-image: linear-gradient(to right, #e57a47, #d83356);
		border-radius: 54rpx;
		font-size: 27rpx;
		line-height: 54rpx;
		text-align: center;
		color: #fff;
		margin-left: 20rpx;
	}
}
</style>
