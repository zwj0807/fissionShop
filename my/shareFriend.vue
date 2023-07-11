<template>
	<view style="background-color: #fff;overflow: hidden;">
		<image class="img" src="/static/touxinag_demo.png"></image>
		<view class="text_line_box">
			<view class="txt">第一步&nbsp;点击保存海报</view>
			<button class="button"    @click="savePosterTap('https://www.jumidongli.com/template/pc/static/demoImg/fissionShop/redhot_bg.png')">保存海报</button >
			
		</view>
		<view class="text_line_box">
			<view class="txt">第二步&nbsp;复制下方文字，发布朋友圈</view>
			<view class="button" @click="copyExpressNo(copyText)">点击复制</view>
		</view>
		<view class="copy_text">
			{{copyText}}
		</view>
	</view>
</template>

<script>

	export default{
		data(){
			return{
				copyText:'会员日-送福利，送兰蔻粉水-享王牌项目 领取万元红包-送完为止，抢到就是赚到——不容错过！'
			}
		},
		methods:{
			copyExpressNo(no) {
				uni.setClipboardData({
					data: no,
					success: () => {
						uni.hideToast()
						uni.getClipboardData({
							success: (res) => {
								this.$util.toast("复制成功")
							},
						})
					}
				});
			},
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
			
		}
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