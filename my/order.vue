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
			<view v-else class="order_box" v-for="(item,index) in dataList" :key="item.id">
				<image class="img" :src="item.image.split(',')[0] ? item.image.split(',')[0] : '/static/touxiang_demo.png'"></image>
				<view style="width: 350rpx;">
					<view class="goods_name">{{item.product_name}}</view>
					<view class="goods_time">{{item.place_time_text}}</view>
				</view>
				<view>
					<view class="state">{{item.status==1 ? '待自提' : item.status==2 ? '已完成': ''}}</view>
					<view class="num">数量:{{item.product_unit}}</view>
				</view>
				<view class="check_code" @click="copyExpressNo(item.write_off)"><text style="margin-right: 15rpx;">核销码：{{item.write_off}}</text> <u-icon  size="35" color="#ccc" name="order" ></u-icon></view>
				<view class="buy_num">￥{{item.amount}}元</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { ordre_list } from '@/api/index.js'
	import { mapGetters } from  'vuex'
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
				dataList:[ ],
				current:0
			}
		},
		onLoad(option) {
			if(option){
				this.current=option.type
			}
			if( !uni.getStorageSync('user_info')){
				uni.reLaunch({
					url:'/pages/login'
				})
			}
		},
		onShow() {
			this.getList()
		},
		computed:{
			...mapGetters(['userInfo','proid']),
		},
		methods: {
			sectionChange(index){
				this.current=index
				this.getList()
			},
			copyExpressNo(no) {
				uni.setClipboardData({
					data: no,
					success: () => {
						uni.hideToast()
						// uni.getClipboardData({
						// 	success: (res) => {
						// 		this.$util.toast("复制成功11")
						// 		 uni.hideToast()
						// 	},
						// })
					}
				});
			},
			getList(){
				let params={
					status:this.current
				}
				ordre_list(params).then(res=>{
					this.dataList=res.data
				})
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
	height: 210rpx;
	background-color: #fff;
	border-radius: 20rpx;
	margin: 25rpx auto 0 auto;
	display: flex;
	// align-items: center;
	padding: 20rpx 24rpx;
	box-sizing: border-box;
	flex-wrap: wrap;
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
		margin: 0rpx 0 0 95rpx;
		font-size: 28rpx;
		color: #f3a633;
	}
	.num{
		margin-top: 30rpx;
		font-size: 26rpx;
		color: #a2a2a2;
		text-align: right;
	}
	.check_code{
		width: 460rpx;
		font-size: 29rpx;
		color: #4b4b4b;
		display: flex;
		align-items: center;
	}
	.buy_num{
		font-size: 26rpx;
		color: #ffab35;
		margin: 10rpx 0 0 32rpx;
		width: 140rpx;
		text-align: right;
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
