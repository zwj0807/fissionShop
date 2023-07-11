<template>
	<view>
		<view class="shop_box" @click="goIndex(item)" v-for="(item,index) in list" :key="item.id">
			<image class="img" :src="item.image.split(',')[0] ? item.image.split(',')[0] : '/static/touxinag_demo.png'"></image>
			<view class="right_box" style="">
				<view class="info_box">
					<view class="title">{{item.name}}</view>
					<view class="address">{{item.address}}</view>
				</view>
				<view class="icon"><u-icon name="arrow-right" size="30"></u-icon></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { login_shop_list } from '@/api/index.js'
	import { mapGetters } from  'vuex'
	export default{
		data(){
			return{
				list:[]
			}
		},
		computed:{
			...mapGetters(['userInfo','proid']),
		},
		onShow() {
			this.getList()
		},
		methods:{
			goIndex(item){
				uni.switchTab({
					url:`/pages/index/index?id=${item.id}`
				})
			},
			getList(){
				login_shop_list().then(res=>{
					this.list=res.data
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