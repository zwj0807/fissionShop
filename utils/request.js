import store from '@/store'
import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import {
	toast,
	showConfirm,
	tansParams
} from '@/utils/common'

let timeout = 30000
const baseUrl = config.baseUrl
console.log('请求地址',config.baseUrl)
const request = config => {
	// 是否需要设置 token
	const isToken = (config.headers || {}).isToken === false
	config.header = config.header || {}
	if (getToken() && !isToken) {
		// config.header['Authorization'] = 'Bearer ' + getToken()   
		 config.header['Authorization'] = getToken()
	}
	// config.header['Authorization'] = 'd774dc00-01ca-4b85-bf57-9393282b9597'
	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}
	return new Promise((resolve, reject) => {
		uni.request({
				method: config.method || 'get',
				timeout: config.timeout || timeout,
				url: config.baseUrl || baseUrl + config.url,
				data: config.data || {},
				header: config.header,
				dataType: 'json'
			}).then(response => {
				
				let {data,errMsg} = response
				const code = data.code || 200
				const msg = errorCode[code] || data.msg || errorCode['default']
				if (code == 401) {
					uni.reLaunch({
						url: '/pages/login?state=401'
					})
					setTimeout(()=>{
						toast('账号未登录或登录状态已过期，请重新登录')
					},1000)
					// showConfirm('登录状态已过期，请重新登录').then(res => {
					// 	if (res.confirm) {
					// 			uni.reLaunch({
					// 				url: '/pages/login?state=401'
					// 			})
					// 	}
					// })
					// reject('无效的会话，或者会话已过期，请重新登录。')
				}else if(code == 403){
					if (config.showErrorMsg !== false) toast(msg)
					reject(code)
				}else if(code == 404){
					if (config.showErrorMsg !== false) toast(msg)
					reject(code)
				}else if (code == 500) {
					if (config.showErrorMsg !== false) toast(msg)
					reject(code)
				} else if(code !== 200){
					if (config.showErrorMsg !== false) toast(msg)
					reject(code)
				}
				resolve(data)
			})
			.catch(error => {
				let { msg } = error
				toast(msg)
				reject(error)
			})
	})
}

export default request
