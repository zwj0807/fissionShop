<template>
	<view>
		<view style="height: 64rpx;">
			<view class="tab_box">
				<u-subsection  :list="list" :current="current" mode="button" @change="sectionChange" fontSize="26rpx" activeColor="#f0f0f0" inactiveColor="#f0f0f0" bgColor="#f13f46"></u-subsection>
			</view>
		</view>
		<view class="item_box" v-for="(item,index) in dataList" :key="item.id">
			<view class="item_num"><text style="font-size: 28rpx;">￥</text>{{item.money}}<text style="font-size: 28rpx;">元</text></view>
			<view class="item_time">{{item.createtime_text}}</view>
			<view class="item_state">{{item.status_text}}</view>
		</view>

	</view>
</template>

<script>
	import { withdrawal_list } from '@/api/index.js'
	export default{
		data(){
			return{
				list:[
					{
					    name: '全部',
					}, {
					    name: '待审核',
					}, {
					    name: '已打款'
					}
				],
				current:0,
				dataList:[ ]
			}
		},
		onShow() {
			this.geList()
		},
		methods:{
			sectionChange(index){
				this.current=index
				this.geList()
			},
			geList(){
				let status =[0,1,3]
				
				let params={
					status: status[this.current]
				}
				withdrawal_list(params).then(res=>{
					this.dataList=res.data
				})
			}
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