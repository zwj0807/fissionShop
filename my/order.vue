<template>
	<view>
		<view style="height: 64rpx;">
			<view class="tab_box">
				<u-subsection  :list="list" :current="current" mode="button" @change="sectionChange" fontSize="26rpx" activeColor="#f0f0f0" inactiveColor="#f0f0f0" bgColor="#e47849"></u-subsection>
			</view>
		</view>
		<view class="order_list">
			<u-empty v-if="dataList.length==0" marginTop="300rpx" mode="list" iconSize="200" textSize="30">
			</u-empty>
			<view v-else class="order_box" v-for="(item,index) in dataList" :key="index">
				<image class="img" :src="item.img"></image>
				<view style="width: 350rpx;">
					<view class="goods_name">{{item.name}}</view>
					<view class="goods_time">{{item.time}}</view>
				</view>
				<view class="state">{{item.state}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
					    name: '全部',
					}, {
					    name: '待自提',
					}, {
					    name: '已完成'
					}
				],
				dataList:[
					{	
						name:'体浮泥化妆品1',
						img: '../static/touxinag_demo.jpg',
						time:'06-17 14:30:05',
						state:'待自提'
					},{	
						name:'体浮泥化妆品2',
						img: '../static/touxinag_demo.jpg',
						time:'06-17 14:30:05',
						state:'待自提'
					}
				],
				current:0
			}
		},
		onLoad() {

		},
		methods: {
			sectionChange(index){
				this.current=index
			}
		}
	}
</script>

<style lang="scss" scoped>
.tab_box{
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
}
.order_box{
	width: 686rpx;
	height: 150rpx;
	background-color: #fff;
	border-radius: 20rpx;
	margin: 25rpx auto 0 auto;
	display: flex;
	align-items: center;
	padding: 0 24rpx;
	box-sizing: border-box;
	.img{
		width: 110rpx;
		height: 110rpx;
	}
	.goods_name{
		font-size: 30rpx;
		color: #090909;
		margin-left: 25rpx;
		font-weight: 500;
	}
	.goods_time{
		margin-top: 24rpx;
		color: #a2a2a2;
		font-size: 26rpx;
		margin-left: 25rpx;
	}
	.state{
		margin: 84rpx 0 0 95rpx;
		font-size: 28rpx;
		color: #f3a633;
	}
}
.order_list{
	min-height: 500rpx;
}
/deep/.u-subsection--button__bar.data-v-244377f2{
	background-color: #f3a633 !important;
}
/deep/.u-subsection--button.data-v-244377f2{
	border-radius: 0;
}
</style>
