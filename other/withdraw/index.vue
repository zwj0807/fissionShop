<template>
	<view>
		<view class="main_box">
			<view class="title">提现金额</view>
			<view class="num_imput"><u-input v-model="withdrawNum" placeholder="请输入提现金额" type="number" ></u-input></view>
			<view style="display: flex;">
				<view class="allow_num">(可提现金额{{400}}元)</view>
				<view class="all_text">全部提现</view>
			</view>
			<view class="button">
				<u-button shape="circle" :customStyle="{color:'#fff;', backgroundColor:'#f13f46;'}" @click="withdrawSubmit">申请提现</u-button>
				<u-button shape="circle" :customStyle="{color:'#fff;', backgroundColor:'#f13f46;',marginTop:'20rpx;'}" @click="withdrawRecord">提现记录</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				withdrawNum:null
			}
		},
		onShow() {
			
		},
		methods:{
			withdrawSubmit(){
				
			},
			withdrawRecord(){
				uni.navigateTo({
					url:'/other/withdraw/record'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.main_box{
	width: 686rpx;
	height: 686rpx;
	border-radius: 12rpx;
	background-color: #fff;
	margin: 32rpx auto 0 auto;
	overflow: hidden;
	.title{
		color: #191919;
		font-weight: 600;
		font-size: 34rpx;
		margin: 32rpx 0 32rpx 32rpx;
	}
	.num_imput{
		height: 80rpx;
		padding: 0 32rpx;
		/deep/.u-input.data-v-fdbb9fe6{
			height: 100% !important;
		}
	}
	.allow_num{
		width: 350rpx;
		margin:40rpx 0 0 32rpx;
		font-size: 24rpx;
		color: #797979;
	}
	.all_text{
		color: #f13f46;
		margin:40rpx 0 0 170rpx;
		font-size: 26rpx;
	}
	.button{
		width: 600rpx;
		margin: 200rpx auto 0 auto;
	}
}

</style>