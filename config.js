const CONFIG = {
	baseUrl: 'https://meishang.jumidongli.cn/index.php/api',
}
let account = uni.getAccountInfoSync()
if (process.env.NODE_ENV == 'development') {
	console.log('开发环境-开发工具')
	CONFIG.baseUrl = 'http://192.168.1.14:802/index.php/api'
	if(account.miniProgram.envVersion == 'trial'){//体验版
		console.log('开发环境-体验环境')
		CONFIG.baseUrl = 'https://meishang.jumidongli.cn/index.php/api'
	}
} else {
	console.log('生产环境')
	CONFIG.baseUrl = 'https://meishang.jumidongli.cn/index.php/api'

}
// #ifdef MP-WEIXIN
	export default CONFIG
// #endif

