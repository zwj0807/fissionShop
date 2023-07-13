// import config from '@/config'
// import { login, logout, } from '@/api/login'
// import { fetchUserInfo } from '@/api/user.js'
import {getToken,setToken,removeToken} from '@/utils/auth'

// const baseUrl = config.baseUrl

const user = {
	state: {
		token: getToken(),
		userInfo: uni.getStorageSync('user_info') ? JSON.parse(uni.getStorageSync('user_info')) : null,
		proid:uni.getStorageSync('pro_id') ? JSON.parse(uni.getStorageSync('pro_id')) : null,
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
			setToken(token)
		},
		SET_USERINFO: (state, info) => {
			state.userInfo = info
			uni.setStorageSync('user_info', JSON.stringify(info))
		},
		SET_PROID:(state, id) => {
			state.proid = id
			uni.setStorageSync('pro_id', JSON.stringify(id))
		},
	},

	actions: {
		// 登录
		// Login({commit,dispatch}, userInfo) {
		// 	return new Promise((resolve, reject) => {
		// 		login(userInfo).then(res => {
		// 			commit('SET_TOKEN', res.token)
		// 			dispatch('GetInfo')
		// 			resolve()
		// 		}).catch(error => {
		// 			reject(error)
		// 		})
		// 	})
		// },
		// 获取用户信息
		// GetInfo({commit,state}) {
		// 	return new Promise((resolve, reject) => {
		// 		fetchUserInfo().then(res => {
		// 			const user = res.data
		// 			commit('SET_USERINFO', user)
		// 			resolve(res)
		// 		}).catch(error => {
		// 			reject(error)
		// 		})
		// 	})
		// },

		// 退出
		// LogOut({commit,state}) {
		// 	return new Promise((resolve, reject) => {
		// 		logout(state.token).then(() => {
		// 			commit('SET_TOKEN', '')
		// 			removeToken()
		// 			uni.clearStorageSync()
		// 			resolve()
		// 		}).catch(error => {
		// 			reject(error)
		// 		})
		// 	})
		// }
	}
}

export default user
