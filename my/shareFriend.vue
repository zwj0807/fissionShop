<template>
	<view style="background-color: #fff;overflow: hidden;">
		<canvas class="canvas-poster" :style="{height: imgheight + 'rpx',width: imgwidth + 'rpx'}" canvas-id="myCanvas"></canvas>
		<image class="img" :src="posterImg ? posterImg : '/static/touxinag_demo.png'" mode=""></image>
		<view class="text_line_box">
			<view class="txt">第一步&nbsp;点击保存海报</view>
			<button class="button"    @click="savePosterTap(posterImg)">保存海报</button >
			
		</view>
		<view class="text_line_box">
			<view class="txt">第二步&nbsp;复制下方文字，发布朋友圈</view>
			<view class="button" @click="copyExpressNo(bannerText)">点击复制</view>
		</view>
		<view class="copy_text">
			{{bannerText}}
		</view>
	</view>
</template>

<script>
import {product_details, poster} from '@/api/index.js'
import { mapGetters } from  'vuex'
	export default{
		
		data(){
			return{
				bannerText:'会员日-送福利，送兰蔻粉水-享王牌项目 领取万元红包-送完为止，抢到就是赚到——不容错过！', //复制活动文字
				posterImg:'',//最后生成的海报图片
				pixelRatio:3,//屏幕像数密度
				inviteQR:'',//动态二维码
				imgwidth:638,
				imgheight:935,
				proInfo:{}
			}
		},
		onLoad() {
			let sysInfo = uni.getSystemInfoSync()
			this.pixelRatio= 750 / sysInfo.windowWidth
			console.log('像素比 ',sysInfo,this.pixelRatio)
		},
		onShow() {
			this.getProDetail()
			
		},
		computed: {
			...mapGetters(['userInfo','proid']),
		},
		methods:{
			getProDetail(){
				product_details({id:this.proid}).then(res=>{
					this.proInfo=res.data
					this.proInfo.image=this.proInfo.image.split(',')
					this.shareing()
				})
			},
			//复制文字
			copyExpressNo(no) {
				uni.setClipboardData({
					data: no,
					success: () => {
						uni.hideToast()
					}
				});
			},
			//判断本地相册授权
			savePosterTap(img) {
				let that = this
				uni.authorize({
			        /* scope.writePhotosAlbum 类型是保存到相册 */
					scope: 'scope.writePhotosAlbum',
					success() {
			            /* 已授权进入 */
						/* 保存图片到相册方法方法 */
						that.imgApi(img)
					},
					complete(res) {
						/* 判断如果没有授权就打开设置选项让用户重新授权 */
					    uni.getSetting({
							success(res) {
							    if (!res.authSetting['scope.writePhotosAlbum']) {
							       /* 打开设置的方法 */
							        that.opensit();
							    }
							}
					    })
				    }
				})
			},
			//保存到本地相册
			imgApi(image) {
			    /* 获取图片的信息 */
			    uni.getImageInfo({
			        src: image,
			        success: function(image) {
			            /* 保存图片到手机相册 */
			            uni.saveImageToPhotosAlbum({
			                filePath: image.path,
			                success: function() {
			                    uni.showModal({
			                        title: '保存成功',
			                        content: '图片已成功保存到相册',
			                        showCancel: false
			                    });
			                },
			                complete(res) {
			                    console.log(res);
			                }
			            });
			        }
			    });
			},
			//授权保存相册权限
			opensit() {
				uni.showModal({
					content: '没有授权保存图片到相册,点击确定去允许授权',
					success: function(res) {
						if (res.confirm) {
							/* 打开设置的API*/
							uni.openSetting({
								success(res) {
									console.log(res.authSetting);
								}
							});
						} else if (res.cancel) {
							uni.showModal({
								cancelText: '取消',
								confirmText: '重新授权',
								content: '你点击了取消，将无法进行保存操作',
								success: function(res) {
									if (res.confirm) {
										uni.openSetting({
											success(res) {
												/* 授权成功 */
												console.log(res.authSetting);
											}
										});
									} else if (res.cancel) {
										console.log('用户不授权');
									}
								}
							});
						}
					}
				});
			},
			//请求后端生成二维码
			shareing(){
				uni.showLoading({
					  title:"海报生成中...",
					 mask:true
				})
				//#ifdef MP-WEIXIN
			        //这里参数是前端和后端商议好，生成二维码需要前端传那些对应的值，这里我传了当前页面的路径和邀请码及当前页面的参数
					let params={
						path:`page/index/index`,
						product_id:1,
					}
					//去后端请求动态二维码

					poster(params).then(res=>{
						if(res.code === 200){
							this.inviteQR = res.data
							this.createPoster();
						}
						
					})
			    //#endif
			},
			
			//生成海报--微信端
			createPoster(){
				let _this = this
				const canvasId = "myCanvas"
				let  ctx = uni.createCanvasContext(canvasId,_this)
				ctx.setFillStyle('#fafafa')
				ctx.fillRect(0,0,_this.imgwidth , _this.imgheight);
				ctx.save()
						//生成banner图
						uni.getImageInfo({
								src: _this.proInfo.image[0],//这里的banner是展示的商品图
								success(image) {
								let bannerW = 638 / _this.pixelRatio
								let bannerH = 500  / _this.pixelRatio
								let bannerX = 0
								let bannerY = 0
								// 将banner到画布上
								ctx.drawImage(image.path, bannerX, bannerY, bannerW, bannerH)
								ctx.restore()
								ctx.save()
			                    //banner 描述   这里会处理多行显示文字，超出显示省略号的效果
								let  bannerTextX = 5 * _this.pixelRatio
								
								let bannerTextY = bannerY + bannerH + 18 * _this.pixelRatio   //这里的y轴起始值是顶上的距离还要特意加上文字的行高
								let chr = _this.bannerText.split("");//这个方法是将一个字符串分割成字符串数组
								let temp = "";
								let row = [];
								ctx.setFontSize( 30 / _this.pixelRatio)
								ctx.setFillStyle("#000000")
								for (var a = 0; a < chr.length; a++) {
								    if (ctx.measureText(temp).width < 170 * _this.pixelRatio) {
										temp += chr[a];
									}else {
										a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
										row.push(temp);
										temp = "";
									}
								}
								
								row.push(temp); 
								if (row.length > 2) {
									let rowCut = row.slice(0, 2);
									let rowPart = rowCut[1];
									let test = "";
									let empty = [];
									for (var a = 0; a < rowPart.length; a++) {
								        if (ctx.measureText(test).width < 170 * _this.pixelRatio) {
											test += rowPart[a];
									    }else {
										    break;
									    }
									}
								   empty.push(test);
								   var group = empty[0] + "..."//这里只显示两行，超出的用...表示
								   rowCut.splice(1, 1, group);
										row = rowCut;
								}
								for (var b = 0; b < row.length; b++) {
									ctx.fillText(row[b], bannerTextX, bannerTextY + b * 15 *_this.pixelRatio, 170 * _this.pixelRatio);
								}
								
								//二维码
								uni.getImageInfo({
									src:_this.inviteQR,
									success(res){
										// 画当前页面的二维码
										const img_x = 10 * _this.pixelRatio
										const img_w_y = 70 * _this.pixelRatio
										const img_y = 200 * _this.pixelRatio				            
			                            ctx.drawImage(res.path,img_x,img_y,img_w_y,img_w_y) 
										
										// //画提示文字
										const tiptextX = img_x + img_w_y + 20
										const tiptext1Y = img_y + 40
										const tiptext1 = '商美A客系统'
										ctx.setFontSize( 16 * _this.pixelRatio)
										ctx.setFillStyle("#121212")
										ctx.fillText(tiptext1, tiptextX, tiptext1Y);
										
										const tiptext2 = '(保存图片分享朋友圈)'
										const tiptextX_2 = tiptextX
										const tiptext1Y_2 = tiptext1Y + 40
										ctx.setFontSize( 10 * _this.pixelRatio)
										ctx.setFillStyle("#5e564a")
										ctx.fillText(tiptext2, tiptextX_2, tiptext1Y_2);
										
										ctx.stroke();
										
										ctx.draw(false, () => {
											
												uni.canvasToTempFilePath({
												width: _this.imgwidth,
												height: _this.imgheight,
												destWidth: _this.imgwidth,				              
			                                    destHeight:_this.imgheight,
											    canvasId: canvasId,
											    fileType: 'png',
												quality:1,
												success: function(result) {
													_this.posterImg = result.tempFilePath;//最终将canvas转换为图片
													uni.hideLoading()
													this.cavashow=false
												},
												fail(error) {
													_this.$util.toast('生成海报失败，请稍后重试！')
												    setTimeout(()=>{
													    uni.hideLoading()
												    },2000)
												}
										    },_this)
										})
										
									},
									fail(error) {
										console.log('获取二维码失败',error)
										_this.$util.toast('生成海报失败，获取二维码失败')
										setTimeout(()=>{
												uni.hideLoading()
										},2000)
									}
								})
							},
							fail(error) {
								console.log('生成商品图失败',error)
								_this.$util.toast('生成海报失败，获取商品图失败')
								setTimeout(()=>{
									uni.hideLoading()
								},2000)
							}
						});
					},
		},
	}
</script>

<style lang="scss" scoped>
	button {
	    margin: unset;
	    padding: unset;
	}
	button:after {
		border: unset;
	}
	.canvas-poster{
	  background-color: #fafafa;
	  zoom: 50%; // 将画布缩小到50%（最好通过像素比进行缩小，像素比是2的话就是50%，如果不全是以像素比为标准，在生成图片的时候可能会出现四周黑边）
	  position: absolute;
	  left: -10000px; // 将画布隐藏在可视区域外
	  background: #fafafa;
	}
	.img{
		width: 638rpx;
		height: 935rpx;
		margin: 55rpx auto;
		display: block;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 1rpx 1rpx 6rpx #828282;
	}
	.text_line_box{
		height: 67rpx;
		padding: 0 55rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		.txt{
			font-size: 30rpx;
			color: #f94152;
		}
		.button{
			width: 145rpx;
			height: 50rpx;
			border-radius: 12rpx;
			background-image: linear-gradient(to right,#f57138,#ed1452);
			color: #fff;
			line-height: 50rpx;
			text-align: center;
			font-size: 26rpx;
		}
	}
	.copy_text{
		margin-top: 30rpx;
		padding: 0 55rpx;
		font-size: 24rpx;
		color: #828282;
		margin-bottom: 50rpx;
	}
</style>