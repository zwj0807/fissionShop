<template>
	<view>
		<view class="title_box">
			<text>邀请好友人数：{{info.invite}}人</text>
			<view class="button">未下单{{info.noplace}}人</view>
		</view>
		<view class="main" >
			<view class="item_box" v-for=" (item ,index) in inviteList" :key="index">
				<image class="img" :src=" item.avatar? item.avatar: '/static/touxinag_demo.jpg'"></image>
				<view class="txt">{{item.nickname}}</view>
				<view class="state" :class="{'state_2':item.status=='已下单'}">{{item.status}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { invite_list } from '@/api/index.js'
import { mapGetters } from  'vuex'
	export default{
		data(){
			return{
				num_1:0,
				num_2:100,
				info:{},//总数据
				inviteList:[],//邀请用户列表
				user:{},//当前登录用户信息
			}
		},
		computed:{
			...mapGetters(['userInfo','proid']),
		},
		onShow() {
			this.getList()
		},
		methods:{
			getList(){
				let params={
					id:this.proid
				}
				invite_list(params).then(res=>{
					this.info=res.data
					let{ inviteList,user}=this.info
					this.inviteList=inviteList
					this.user=user
				})
			}
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