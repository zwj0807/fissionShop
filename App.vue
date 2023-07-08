<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.init()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			//封装微信获取用户code，避免嵌套
			login() {
			    return new Promise((resolve, reject) => {
			        uni.login({
			            success(res) {
							console.log('调用wxlogin成功')
			                resolve(res)
			            },
			            fail(err) {
							console.log('调用wxlogin失败')
			                reject(err)
			            }
			        })
			    })
			},
			async init() {
			    //调用微信登陆
			    let res = await this.login()
			    if (res.code && ['login:ok'].includes(res.errMsg)) {
			        //后端通过code调用微信API返回openid/unionid/session_key参数， 存储起来,前端无法直接调用微信相关API
			        // let openIdRes = await getWechatOpenIdByCode({ code: res.code })
			        // if (openIdRes.success) {
			        //     let { openId, sessionKey } = openIdRes
			        //     this.openId = openId
			        //     this.sessionKey = sessionKey
			        // }
					
			    } else {
			        //异常处理，再次发起请求或者抛出异常
					setTimeout(()=>{this.init()},1500)
			    }
			},
		}
	}
</script>

<style>
	page{
		background-color: #e6e6e6;
	}
</style>
<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss"
</style>
