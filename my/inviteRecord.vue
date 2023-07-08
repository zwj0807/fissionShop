<template>
	<view>
		<view class="title_box">
			<text>邀请好友人数：{{num_1}}人</text>
			<view class="button">未下单{{num_2}}人</view>
		</view>
		<view class="main" >
			<view class="item_box" v-for=" item in 12">
				<image class="img" src="../static/touxinag_demo.jpg"></image>
				<view class="txt">huhulhulhull</view>
				<view class="state" :class="{'state_2':true}">未下单</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num_1:0,
				num_2:100
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.title_box{
		width: 695rpx;
		height: 100rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin: 32rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 32rpx;
		box-sizing: border-box;
		text{
			width: 400rpx;
			font-size: 30rpx;
			color: #000;
			font-weight: 600;
		}
		.button{
			min-width: 170rpx;
			height: 44rpx;
			border: 1rpx solid #f9495a;
			color: #f9495a;
			text-align: center;
			line-height: 44rpx;
			border-radius: 44rpx;
			font-size: 26rpx;
		}
	}
	.main{
		padding: 0 32rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.item_box{
			width: 100rpx;
			height: 160rpx;
			// background-color: #72ffb9;
			margin-bottom: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.img{
				width: 85rpx;
				height: 85rpx;
				border-radius: 50%;
				overflow: hidden;
			}
			.txt{
				width: 85rpx;
				color: #454140;
				font-size: 24rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: center;
				margin-top: 10rpx;
			}
			.state{
				width: 100rpx;
				font-size: 24rpx;
				text-align: center;
				color: #939393;
				margin-top: 10rpx;
			}
			.state_2{
				color: #dc4d1d;
			}
		}
	}

</style>