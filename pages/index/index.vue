<template>
	<view :class="{popupShow:isTurntable}">
		<view style="height: 168rpx;">
			<view class="nav_top">
				<view class="text">{{proInfo.name}}</view>
			</view>
		</view>
		<view class="top_box">
			<view class="box_bg">
				<image class="img" :src="user.avatar ? user.avatar : '../../static/touxinag_demo.png'"></image>
				<view class="text">我的红包余额：</view>
				<view class="text_2">{{user.money}}元</view>
				<view class="text_3">正在变大...</view>
				<view class="withdraw" @click="goWithdraw(user.withdrawal_amount)">去提现</view>
			</view>
		</view>
		<view class="banner_box">
			<u-swiper
			    :list="proInfo.image"
				height="730"
				keyName="image"
			    :autoplay="false"
			    circular>
			</u-swiper>
		</view>
		<view class="good_box">
			<view class="box_one">
				<view class="box_one_price">
					<text style="font-size: 30rpx;">￥</text><text>{{proInfo.price}}</text>
					<view class="or_price"><text>￥</text><text>{{proInfo.original_price}}</text></view>
				</view>
				<view class="box_one_info">
					已是最低价￥{{proInfo.price}}
				</view>
				<view class="bottom_text">剩余时间: &nbsp; {{dateArr[0]}}天{{dateArr[1]}}小时{{dateArr[2]}}分{{dateArr[3]}}秒</view>
				<view class="right_text">限时抢购</view>
			</view>
			<view class="box_two">
				<view class="icon"><u-icon name="red-packet-fill" size="40" color="#efa492"></u-icon></view>
				<view class="text">给2个朋友送红包可立减{{parseFloat(user.refund_amount) * 2}}</view>
				
				<button v-if="isShare" class="give"  open-type="share"><view class="give" style="right: 0;">送红包</view></button>
				<button v-else class="give" @click="$util.toast('未购买不能分享，请先购买')"><view class="give" style="right: 0;">送红包</view></button>
			</view>
			<view class="box_three">
				<view class="goods_title">{{proInfo.name}}</view>
				<view class="goods_award">
					<view style="display: flex; align-items: center;margin: 0 auto;">
						<u-icon name="bell-fill" size="35" color="#b0762c" ></u-icon>
						<view class="award_text">您下单后，您的红包将会再次变大为<text style="color: crimson;">{{parseFloat(user.refund_amount) + parseFloat(user.money)}}元</text></view>
					</view>
				</view>
				<view class="goods_presenter" v-show="proInfo.gift_unit >= 0">
					<view class="presenter_box">赠送</view>
					<view class="presenter_text info">前<text style="color: #e23a42;">{{proInfo.gift_original_quantity}}</text>名下单赠送{{proInfo.gift}}</view>
					<view class="presenter_text residue">还剩<text style="color: #e23a42;">{{proInfo.gift_unit}}</text>名</view>
				</view>
				<view class="goods_remark" v-show="proInfo.gift_unit >= 0">温馨提示: {{proInfo.tips}}</view>
			</view>
		</view>
		<view class="friends_box">
			<view class="friends_line_one">
				<view class="line_one_text"><text style="font-size: 24rpx; color: #e27e6b;">{{allUser.length}}</text>人正在给朋友发红包</view>
				<button v-if="isShare" open-type="share"><view class="line_one_share">我也要送</view></button>
				<button v-else  @click="$util.toast('未购买不能分享，请先购买')"><view class="line_one_share">我也要送</view></button>
			</view>
			<view class="head_box">
				<view class="head_item_box" v-for="(item,index) in allUser" :key="item.id">
					<image class="head_img" :src=" item.avatar  ? item.avatar : '../../static/touxinag_demo.png'"></image>
					<view class="head_name">{{item.nickname}}</view>
				</view>

			</view>
		</view>
		<view class="merchant_box">
			<view class="merchant_title">商铺信息</view>
			<view class="merchant_info">
				<image class="img" :src="shop.image ? shop.image :'../../static/touxinag_demo.png'"></image>
				<view class="merchant_info_name">
					<view class="info_name">{{shop.name}}</view>
					<view class="address_name"><u-icon name="map-fill" size="20" color="#8a8a88"></u-icon>{{shop.address}}</view>
				</view>
				<view class="cut_line"></view>
				<view style="margin-left: 30rpx;"  @click="callPhone(shop.tel)">
					<u-icon name="phone-fill" size="40" color="#8a8a88"></u-icon>
				</view>
				
			</view>
		</view>
		<view class="detail_box">
			<text class="txt">商品详情</text>
			<view style="overflow: hidden;" v-html="proInfo.content"></view>
		</view>
		<view style="height: 110rpx;">
			<view class="tabbar_box">
				<view class="tabar_left">
					<view class="fun_box" @click="goRed">
						<view><u-icon name="red-packet" size="40" color="#c3c3c3"></u-icon></view>
						<view class="text">红包</view>
					</view>
					<view class="fun_box center" @click="goShare">
						<view><u-icon name="share" size="40" color="#c3c3c3"></u-icon></view>
						<view class="text">分享赚</view>
					</view>
					<view class="fun_box" @click="goMy">
						<view><u-icon name="account" size="40" color="#c3c3c3"></u-icon></view>
						<view class="text">我的</view>
					</view>
				</view>
				<view class="tabar_right" :class="{'tabar_right_end' : dateArr[4]=='-1' || !proInfo.limited_status}" @click="immediately">
					{{dateArr[4]=='-1' || !proInfo.limited_status ? "已结束" : "立即购买"}}
				</view>
				<view class="tabar_tips">首次下单返<text style="color: #ec6238;">{{user.refund_amount}}</text>元</view>
			</view>
		</view>
		<button open-type="share" v-if="isShare">
			<view class="right_share" >
				<view class="box"><u-icon name="share-square" size="40" color="#fff"></u-icon></view>
				<view class="txt">分享</view>
			</view>
		</button>
		<button  v-else  @click="$util.toast('未购买不能分享，请先购买')">
			<view class="right_share" >
				<view class="box"><u-icon name="share-square" size="40" color="#fff"></u-icon></view>
				<view class="txt">分享</view>
			</view>
		</button>

		<view class="right_service" @click="callPhone(shop.tel)">
			<view class="box"><u-icon name="kefu-ermai" size="40" color="#fff"></u-icon></view>
			<view class="txt">客服</view>
		</view>
		<!-- 大转盘 -->
		<view>
			<u-popup :show="isTurntable" :customStyle="{overflow: 'hidden'}" round="15" mode="center" bgColor="transparent"  :closeOnClickOverlay="false" :safeAreaInsetBottom="false">
			    <view class="ad_box">
			        <view class="ad_title">{{activityInfo.title}}</view>
					<view class="wheel_main">
						<view class="wheel_box">
							<LuckyWheel
								  v-if="isTurntable"
							      ref="myLucky"
							      width="490rpx"
							      height="490rpx"
							      :blocks="blocks"
							      :prizes="prizes"
							      :buttons="buttons"
							      @start="startCallBack"
							      @end="endCallBack"
							    />
						</view>
						<view class="button" @click="startCallBack">试试手气</view>
					</view>
			    </view>
			</u-popup>
		</view>
		<view>
			<u-popup :show="winShow" :customStyle="{overflow: 'hidden'}" round="15" mode="center" :closeOnClickOverlay="false" @close="close">
				<view class="win_box" >
					<view class="win_title">恭喜！获得现金奖励</view>
					<view class="win_txt">{{smokeInfo.money}}<text>元</text></view>
					<view class="submit_button" @click="adopt">
						领取
					</view>
					<view style="height: 1rpx;"></view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import LuckyWheel from '@lucky-canvas/uni/lucky-wheel' // 大转盘
	import { getToken } from '@/utils/auth'
	import { product_details,current_user,activity_details,activity_smoke,is_share } from '@/api/index.js'
	import { mapGetters } from  'vuex'
	export default {
		components:{
			LuckyWheel
		},
		data() {
			return {
					isTurntable:false, //大转盘是否显示
					winShow:false, //转盘结束确认领取对话框
					blocks: [{ padding: '10rpx', background: '#b41c1b' }],
					buttons: [
					  { radius: '80rpx', background: '#b80100' },
					  { radius: '80rpx', background: '#f33213' },
					  {
					    radius: '60rpx', background: '#c0201d',
					    pointer: true,
					    fonts: [{ text: '开始\n抽奖',fontColor:'#fff',fontSize:'26rpx', top: '-30rpx' }]
					  },
					],
					prizes: [],
					
					dateArr:['00','00','00','00'],//倒计时
					proInfo:{}, //产品信息
					user:{},//当前登录用户信息
					allUser:[], //所有用户的信息
					shop:{}, //商铺信息
					activityInfo:{},//大转盘信息
					smokeInfo:{}, // 中奖信息
					isShare:false,
			}
		},
		onLoad(options) {
			
			let token = getToken()
			console.log('分享参数',options)
			
			//好友分享过来的 或者 其他页面跳转过来的
			if(options.product_id){
				this.$store.commit('SET_PROID',options.product_id)
			}
			if(options.uid){
				this.$store.commit('SET_UID',options.uid)
			}
			
			//二维码分享过来的
			if(options.scene != undefined){
				console.log( "options.scene",decodeURIComponent(options.scene))
		
			    const scene = decodeURIComponent(options.scene) // 获取到的是编码后的，需要解码，然后截取
		
			    let product_id = scene.substr(0,scene.indexOf('&'))
		
			    let uid = scene.substr(scene.indexOf('&') + 1)
		
			    let productId = product_id.substr(product_id.indexOf('=') + 1)
		
			    let uId = uid.substr(uid.indexOf('=') + 1)
				
				this.$store.commit('SET_PROID',productId)
				this.$store.commit('SET_UID',uId)
			}
			
			if(!token){//无登录状态跳转登录页
				uni.reLaunch({
					url:`/pages/login?state=200`
				})
			}
			
		},
		onShareAppMessage(res) {
		    return {
		      title: '美商A客系统',
		      path: `/pages/index/index?product_id=${this.proid}&uid=${this.uid}`,
		    }
		},
		onPullDownRefresh() {

			this.getproductDetails()
			this.getActivity()
			this.getUserInfo()

			setTimeout(function () {
				uni.stopPullDownRefresh()
			}, 500)
		},
		onShow() {
			uni.hideTabBar()
			this.getproductDetails()
			this.getActivity()
			this.getUserInfo()
		},
		onHide() {
			uni.showTabBar()
		},
		computed: {
			...mapGetters(['userInfo','proid','uid']),
		},
		methods: {
			goWithdraw(num){
				uni.navigateTo({
					url:'/other/withdraw/index'
				})
			},
			goMy(){
				uni.switchTab({
					url: '/pages/my/index'
				});
			},
			startCallBack () {
			  // 先开始旋转
			  this.$refs.myLucky.play()
			  let params={
				  id:this.proid
			  }
			  activity_smoke(params).then(res=>{
				  let index = 0
				  this.smokeInfo=res.data
				  // 调用stop停止旋转并传递中奖索引
				  this.$refs.myLucky.stop(this.smokeInfo.position)
				  
			  })
			},
			// 抽奖结束触发回调
			endCallBack (prize) {
			  // 奖品详情
			  console.log(prize)
			  this.winShow=true
			},
			adopt(){
				this.getUserInfo()
				this.winShow = false
				this.isTurntable =false
			},
			goRed(){
				uni.switchTab({
					url:'/pages/red/index'
				})
			},
			goShare(){
				uni.switchTab({
					url:'/pages/share/index'
				})
			},

			callPhone(item){
				let phone = item; // 需要拨打的电话号码
				const res = uni.getSystemInfoSync();
				// ios系统默认有个模态框
				if (res.platform == 'ios') {
					 uni.makePhoneCall({
						phoneNumber: phone,
						success() {
							console.log('ios拨打成功了');
						},
						fail() {
							console.log('ios拨打失败了');
						}
					})
				} else {
					//安卓手机手动设置一个showActionSheet
					uni.showActionSheet({
						itemList: [phone, '呼叫'],
						success: function(res) {
							if (res.tapIndex == 1) {
								uni.makePhoneCall({
									phoneNumber: phone,
									success() {
										console.log('安卓拨打成功了');
									},
									fail() {
										console.log('安卓拨打失败了');
									}
								})
							}
						}
					})
				}
			},
			immediately(){
				if(this.dateArr[4]=='-1'|| !this.proInfo.limited_status){
					this.$util.toast('活动已结束')
					return false
				}else{
					uni.navigateTo({
						url:'/other/order'
					})
				}
				
			},
			down(){
				let timer= setInterval(()=>{
					this.dateArr= this.$util.cutDownDate(this.$util.parseTime(this.proInfo.limited_time))
					if(this.dateArr[4]=='-1'){ //倒计时结束
						this.dateArr=['00','00','00','00','-1']
						clearInterval(timer)
					}
				},1000)
			},
			getproductDetails(){
				let params={
					id:this.proid,
					myid:this.uid
				}
				product_details(params).then(res=>{
					this.proInfo=res.data
					this.proInfo.image=this.proInfo.image.split(',')
					let { allUser, user, is_turntable, shop, service }=this.proInfo
					this.user=user
					this.$store.commit('SET_PROID',this.proInfo.id)
					this.$store.commit('SET_UID',this.user.id)
					this.allUser=allUser
					this.isTurntable=is_turntable
					this.shop=shop
					if(this.proInfo.limited_status){
						this.down()
					}
					this.getisShare()
					
				})
			},
			getActivity(){
				let params={
					id:this.proid
				}
				activity_details(params).then(res=>{
					this.activityInfo=res.data
					//处理转盘数据
					let { activity_content } = this.activityInfo
					this.prizes=[]
					let background = ['#e8e8e8','#fefefe']
					activity_content.forEach((item,index)=>{
						let obj={
							fonts:[
								{
									text: item.prize + '元现金',
									top:'10%',
									fontColor:'#ff953e',
									fontSize:'28rpx'
								}
							],
							background: background[index%2]
						}
						this.prizes.push(obj)
					})
				})
			},
			getUserInfo(){
				current_user().then(res=>{
					this.user=res.data
					this.$store.commit('SET_USERINFO', this.user)
				})
			},
			getisShare(){
				let params={
					uid:  this.user.uid,
					pid:  this.proInfo.id
				}
				is_share(params).then(res=>{
					this.isShare = res.data
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #e6e6e6;
	}
</style>
<style lang="scss" scoped>
	button{padding: 0;margin: 0;}
	button::after{ border: none; }
.nav_top{
	width: 100%;
	height: 168rpx;
	background-color: #f7d7cf;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
	.text{
		font-size: 30rpx;
		color: #000;
		margin-top: 88rpx;
	}
}
.top_box{
	height: 125rpx;
	background-color: #f2c4b4;
	display: flex;
	justify-content: center;
	align-items: center;
	.box_bg{
		width: 692rpx;
		height: 78rpx;
		border-radius: 30rpx;
		background-color: #fefefe;
		padding: 4rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		position: relative;
		.img{
			display: block;
			width: 52rpx;
			height: 52rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-left: 10rpx;
		}
		.text{
			font-size: 24rpx;
			color: #4d4d4d;
			margin-left: 10rpx;
		}
		.text_2{
			font-size: 30rpx;
			color: #d80000;
			margin-left: 10rpx;
		}
		.text_3{
			font-size: 24rpx;
			color: #d80000;
			margin-left: 10rpx;
		}
		.withdraw{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 10rpx;
			width: 180rpx;
			height: 65rpx;
			background-color: #e84e78;
			border-radius: 21rpx;
			text-align: center;
			line-height: 65rpx;
			color: #fff;
			font-size: 25rpx;
		}
	}
}
.banner_box{
	width: 100%;
	height: 730rpx;
}
.good_box{
	width: 720rpx;
	min-height: 570rpx;
	border-radius: 20rpx;
	background-color: #fff;
	margin: 0 auto;
	margin-top: -40rpx;
	position: relative;
	overflow: hidden;
	.box_one{
		height: 140rpx;
		background-image: linear-gradient(to right, rgba(230,73,52,1), rgba(239,142,56,1));
		padding: 25rpx 30rpx;
		display: flex;
		position: relative;
		.box_one_price{
			font-size: 50rpx;
			color: #fff;
			.or_price{
				font-weight: 400;
				font-size: 24rpx;
				text-decoration: line-through;
				margin-top: 20rpx;
			}
		}
		.box_one_info{
			min-width: 212rpx;
			height: 50rpx;
			border: 1rpx solid #fff;
			border-radius: 0 50rpx 50rpx 50rpx;
			text-align: center;
			line-height: 50rpx;
			font-size: 24rpx;
			color:#fff;
			margin-top: 14rpx;
			margin-left: 50rpx;
			padding: 0 20rpx;
		}
		.bottom_text{
			font-size: 26rpx;
			color:#fff;
			position: absolute;
			top: 136rpx;
			right: 77rpx;
		}
		.right_text{
			font-size: 50rpx;
			font-weight: 600;
			transform: rotate(35deg);
			position: absolute;
			top: 41rpx;
			right: -7rpx;
			color:#fff;
		}
	}
	.box_two{
		width: 660rpx;
		height: 80rpx;
		border-radius: 20rpx;
		background-color: #e75434;
		margin: 0 auto;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		position: relative;
		.icon{
			width: 38rpx;
			height: 38rpx;
			margin-left: 20rpx;
		}
		.text{
			margin-left: 15rpx;
			font-size: 24rpx;
			color: #fff;
		}
		.give{
			width: 146rpx;
			height: 60rpx;
			background-color: #fefefe;
			border-radius: 20rpx;
			position: absolute;
			top:50%;
			right: 15rpx;
			color: #d80000;
			line-height: 60rpx;
			text-align: center;
			transform: translateY(-50%);
			font-size: 26rpx;
		}
	}
	.box_three{
		padding: 27rpx;
		.goods_title{
			font-size: 35rpx;
			font-weight: 600;
		}
		.goods_award{
			height: 60rpx;
			border-radius: 60rpx;
			background-image: linear-gradient(to right, #f5db95, #f3bd5e);
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			color: #b0762c;
			.award_text{
				margin-left: 28rpx;
				font-size: 24rpx;
			}
		}
		.goods_presenter{
			display: flex;
			align-items: center;
			margin-top: 15rpx;
			.presenter_box{
				width: 60rpx;
				height: 40rpx;
				border-radius: 10rpx;
				border: 1rpx solid #e23a42;
				color: #e23a42;
				line-height: 40rpx;
				text-align: center;
				font-size: 22rpx;
				
			}
			.presenter_text{
				font-size: 24rpx;
				color: #656565;
			}
			.info{
				margin-left: 15rpx;
			}
			.residue{
				margin-left: 35rpx;
			}
		}
		.goods_remark{
			font-size: 22rpx;
			color: #c8a266;
			margin-top: 15rpx;
		}
	}
}
.friends_box{
	width: 720rpx;
	height: 410rpx;
	background-color: #fff;
	border-radius: 20rpx;
	background-color: #fff;
	margin: 0 auto;
	margin-top: 30rpx;
	overflow: hidden;
	.friends_line_one{
		height: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 23rpx 30rpx;
		.line_one_text{
			font-size: 22rpx;
			color: #7e7d7d;
		}
		.line_one_share{
			width: 154rpx;
			height: 50rpx;
			border-radius: 50rpx;
			background-color: #e07c3e;
			line-height: 50rpx;
			text-align: center;
			color: #fff;
			font-size: 26rpx;
		}
	}
	.head_box{
		height: 300rpx;
		padding: 23rpx 30rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		overflow: auto;
		.head_item_box{
			width: 85rpx;
			height: 120rpx;
			margin: 0 22rpx 38rpx 22rpx;
			.head_img{
				width: 85rpx;
				height: 85rpx;
				border-radius: 50%;
			}
			.head_name{
				width: 85rpx;
				overflow: hidden;
				font-size: 23rpx;
				color: #14100f;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: center;
			}
		}
	}
}
.merchant_box{
	width: 720rpx;
	height: 250rpx;
	background-image: linear-gradient(to bottom, #faf6da, #fefefc);;
	border-radius: 20rpx;
	margin: 0 auto;
	margin-top: 30rpx;
	margin-bottom: 30rpx;
	.merchant_title{
		width: 660rpx;
		height: 65rpx;
		font-size: 32rpx;
		font-weight: 600;
		border-bottom: 1rpx solid #f3dac8;
		margin: 0 auto;
		padding-top: 27rpx;
	}
	.merchant_info{
		display: flex;
		align-items: center;
		width: 660rpx;
		margin: 20rpx auto;
		.img{
			width: 100rpx;
			height: 100rpx;
			
		}
		.merchant_info_name{
			margin-left: 20rpx;
			.info_name{
				font-size: 26rpx;
				color: #000;
			}
			.address_name{
				margin-top: 13rpx;
				font-size: 22rpx;
				color: #8a8a88;
				display: flex;
				width: 432rpx;
			}
			
		}
		.cut_line{
			width: 1rpx;
			height: 53rpx;
			background-color: #f3dac8;
			margin-left: 25rpx;
		}
	}
}
.detail_box{
	min-height: 90rpx;
	background-color: #fff;
	padding: 30rpx;
	margin-bottom: 30rpx;
	.txt{
		font-size: 32rpx;
		color: #000;
		font-weight: 600;
		margin-bottom: 30rpx;
		display: block;
	}
	.detail_img{
		width: 100%;
	}
}
.tabbar_box{
	width: 100%;
	height: 110rpx;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	z-index: 999;
	.tabar_left{
		width: 50%;
		height: 110rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.fun_box{
			width: 33%;
			height: 90rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.text{
				color: #c3c3c3;
				font-size: 20rpx;
			}
		}
		.center{
			border-left: 1rpx solid #c3c3c3;
			border-right: 1rpx solid #c3c3c3;
		}
	}
	.tabar_right{
		width: 50%;
		height: 110rpx;
		background-image: linear-gradient(to right,#e9a456,#ec6238);
		color: #fff;
		line-height: 110rpx;
		font-size: 33rpx;
		text-align: center;
	}
	.tabar_right_end{
		background-image: linear-gradient(to right,#626262,#626262);
	}
	.tabar_tips{
		width: 230rpx;
		height: 120rpx;
		border-radius: 20rpx;
		background-color: rgba(125,123,110,.5);
		font-size: 30rpx;
		line-height: 120rpx;
		text-align: center;
		color: #fff;
		position: absolute;
		top:-140rpx;
		right: 32rpx;
		animation: bounce 1s infinite ;
	}
	@keyframes bounce {
		0%{
			top:-140rpx;
		}
		50%{
			top:-130rpx;
		}
		100%{
			top: -140rpx;
		}
	}
}
.right_share{
	width: 70rpx;
	height: 90rpx;
	position: fixed;
	top: 50%;
	right: 40rpx;
	// display: flex;
	// justify-content: center;
	// align-items: center;
	z-index: 999;
	.box{
		width: 50rpx;
		height: 50rpx;
		border-radius: 20rpx;
		background-color: #c22b12;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.txt{
		width: 46rpx;
		height: 30rpx;
		border-radius: 30rpx;
		border: 1rpx solid #c22b12;
		color: #c22b12;
		text-align: center;
		line-height: 30rpx;
		font-size: 20rpx;
	}
}
.right_service{
	width: 80rpx;
	height: 80rpx;
	position: fixed;
	top: 57%;
	right: 45rpx;
	border-radius: 50%;
	background-color: rgba(125,123,110,.5);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.txt{
		color:#fff;
		font-size: 18rpx;
	}
}

.ad_box{
	width: 700rpx;
	height: 850rpx;
	// background-color: #d22c42;
	.ad_title{
		height: 115rpx;
		font-size: 40rpx;
		border-radius: 15rpx;
		color: #fff;
		font-weight: 600;
		text-align: center;
		line-height: 115rpx;
		background-image: linear-gradient(to right,#ff6e5b,#f9425c);
	}
	.wheel_main{
		width: 650rpx;
		height: 735rpx;
		background-color: #e33348;
		border-radius: 0 0 20rpx 20rpx;
		margin: 0 auto;
		overflow: hidden;
		.wheel_box{
			width: 570rpx;
			height: 570rpx;
			background-color: #d22c42;
			border-radius: 15rpx;
			margin: 30rpx auto 0 auto;
			padding: 50rpx 0 0 0;
			box-sizing: border-box;
		}
		.button{
			width: 365rpx;
			height: 74rpx;
			margin: 30rpx auto;
			color: #e5001b;
			font-weight: 700;
			border-radius: 74rpx;
			background-image: linear-gradient(to bottom,#ffd89d,#faab5e);
			line-height: 74rpx;
			text-align: center;
			font-size: 38rpx;
		}
		.button:active{
			filter: brightness(80%);
		}
	}
}
.win_box{
	width: 500rpx;
	height: 400rpx;
	.win_title{
		height: 100rpx;
		color: #dc4d47;
		text-align: center;
		font-size: 45rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #f5ebef;
	}
	.win_txt{
		height: 220rpx;
		color: #e3512b;
		font-size: 100rpx;
		line-height: 220rpx;
		text-align: center;
		font-weight: 600;
		text{
			font-size: 36rpx;
		}
	}
	.submit_button{
		width: 300rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #f6d5a2;
		font-size: 40rpx;
		background-color: #ff2f66;
		border-radius: 90rpx;
		font-weight: 600;
		margin: 0 auto 50rpx auto;
	}
}
.popupShow {
	overflow: hidden;
	position: fixed;
	width: 100%;
}
</style>
