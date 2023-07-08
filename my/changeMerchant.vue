<template>
	<view>
		<view class="shop_box" @click="goIndex">
			<image class="img" src="../static/touxinag_demo.jpg"></image>
			<view class="right_box" style="">
				<view class="info_box">
					<view class="title">云紫妈妈孕产调理中心</view>
					<view class="address">山东省青岛市李沧区</view>
				</view>
				<view class="icon"><u-icon name="arrow-right" size="30"></u-icon></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			goIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop_box{
		width: 686rpx;
		height: 127rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin: 22rpx auto;
		overflow: hidden;
		display: flex;
		.img{
			width: 127rpx;
			height: 127rpx;
			border-radius: 12rpx;
		}
		.right_box{
			display: flex;  
			width: calc(100% - 127rpx); 
			justify-content: space-between; 
			align-items: center;
			.info_box{
				// background-color: #59ffd6;
				padding: 0 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: f;
				.title{
					font-size: 30rpx;
					font-weight: 600;
				}
				.address{
					font-size: 26rpx;
					color: #9f9f9f;
					margin-top: 7rpx;
				}
			}
			.icon{
				margin-right: 32rpx;
			}
		}
		
	}
</style>