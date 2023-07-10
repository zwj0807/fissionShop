<template>
	<view>
		<view style="height: 64rpx;">
			<view class="tab_box">
				<u-subsection  :list="list" :current="current" mode="button" @change="sectionChange" fontSize="26rpx" activeColor="#f0f0f0" inactiveColor="#f0f0f0" bgColor="#f13f46"></u-subsection>
			</view>
		</view>
		<view class="item_box" v-for="(item,index) in dataList" :key="index">
			<view class="item_num"><text style="font-size: 28rpx;">￥</text>{{item.num}}<text style="font-size: 28rpx;">元</text></view>
			<view class="item_time">{{item.time}}</view>
			<view class="item_state">{{item.state}}</view>
		</view>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{
					    name: '全部',
					}, {
					    name: '待审核',
					}, {
					    name: '已通过'
					}
				],
				current:0,
				dataList:[
					{num:400,time:'2023-7-10 12:00:00',state:'待审核'}
				]
			}
		},
		methods:{
			sectionChange(index){
				this.current=index
			},
		}
	}
</script>

<style lang="scss">
	.tab_box{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}
	.item_box{
		width: 686rpx;
		height: 100rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin: 32rpx auto;
		display: flex;
		align-items: center;
		.item_num{
			width: 250rpx;
			font-size: 40rpx;
			color: #ffb134;
			margin-left: 32rpx;
		}
		.item_time{
			width: 250rpx;
			color: #999;
			font-size: 24rpx;
			margin-top: 40rpx;
		}
		.item_state{
			font-size: 24rpx;
			color: #aaff00;
			margin: 40rpx 0 0 54rpx;
		}
	}
	/deep/.u-subsection--button__bar.data-v-244377f2{
		background-color: #ffb43a !important;
	}
	/deep/.u-subsection--button.data-v-244377f2 {
		border-radius: 0 !important;
	}
</style>