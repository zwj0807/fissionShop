const CONFIG = {
	development: {
		baseUrl: 'http://192.168.1.22:9090', 
	},
	test: {
		baseUrl: 'http://47.100.247.13:9090',
	},
	production: {
		baseUrl: 'http://192.168.1.14:802/index.php/api',
	}
}
// #ifdef MP-WEIXIN
export default CONFIG['production']
// #endif

