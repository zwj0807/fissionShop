<template>
	<view>
		<view class="item_box" v-for="(item,index) in list" :key="item.id">
			<view class="line_one">
				<view>{{obj[item.category]}}</view>
				<view style="font-weight: 600; color: #ff0000;">+{{item.money}}元</view>
			</view>
			<view class="line_two">
				<view>{{$util.parseTime(item.createtime)}}</view>
				<view>{{dateArr[0]}}天{{dateArr[1]}}小时{{dateArr[2]}}分{{dateArr[3]}}秒失效</view>
			</view>
		</view>
	</view>
</template>

<script>
import { red_envelope_list } from '@/api/index.js'
import { mapGetters } from  'vuex'
	export default{
		data(){
			return{
				obj:{
					1:'拆红包奖励',
					2:'用户下单佣金'
				},
				num:120,
				dateArr:['00','00','00','00'],
				info:{},
				list:[],
			}
		},
		onShow() {
			this.getList()
		},
		computed:{
			...mapGetters(['userInfo','proid']),
		},
		methods:{

			down(){
				let timer= setInterval(()=>{
					this.dateArr= this.$util.cutDownDate(this.$util.parseTime(this.info.product.limited_time))
					if(this.dateArr[4]=='-1'){ //倒计时结束
						this.dateArr=['00','00','00','00','-1']
						clearInterval(timer)
					}
				},1000)
			},
			getList(){
				let params={
					id:this.proid
				}
				red_envelope_list(params).then(res=>{
					this.info=res.data
					let{ list } = this.info
					this.list = list
					this.down()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item_box{
		width: 700rpx;
		height: 170rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 30rpx auto;
		padding: 31rpx 32rpx;
		box-sizing: border-box;
		.line_one{
			display: flex;
			justify-content: space-between;
			font-size: 31rpx;
			
		}
		.line_two{
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color:#a19c9b;
			margin-top: 40rpx;
		}
	}
</style>