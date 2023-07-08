<template>
	<view>
		<view class="item_box">
			<view class="line_one">
				<view>{{obj[0]}}</view>
				<view style="font-weight: 600; color: #ff0000;">+{{num}}元</view>
			</view>
			<view class="line_two">
				<view>2023-07-03 13:31:32</view>
				<view>{{oDay}}天{{oHour}}小时{{oMinute}}分{{oSecond}}秒失效</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				obj:{
					0:'拆红包奖励'
				},
				num:120,
				oDay:0,
				oHour:0,
				oMinute:0,
				oSecond:0,
			}
		},
		onShow() {
			this.down()
		},
		methods:{
			down(){
				setInterval(()=>{
					this.cutDate('2023/07/10 17:00:00')
				},1000)
			},
			cutDate(time){
				//当前时间
				let startTime = new Date();
				//结束时间
				let endTime =  new Date(time);
				//算出中间差，以毫秒数返回.
				let countDown = (endTime.getTime()-startTime.getTime());
				//获取天数
				let oDay = parseInt(countDown/1000/60/60/24) 
				//获取小时数
				let oHour = parseInt(countDown/1000/60/60%24);
				//获取分钟数
				let oMinute = parseInt(countDown/1000/60%60);
				//获取秒数
				let oSecond = parseInt(countDown/1000%60);
				//输出
				this.oDay= this.filterNum(oDay)
				this.oHour= this.filterNum(oHour)
				this.oMinute= this.filterNum(oMinute)
				this.oSecond= this.filterNum(oSecond)
			},
			filterNum(n){
			    return n < 10 ?'0'+n :n;
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