import persistedState from 'vuex-persistedstate' // 引入数据持久化插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const context = require.context('./modules', false, /\.js$/);
import getters from './getters'
const moduleStores = {};

context.keys().forEach(key => {
	// 获取读取到的文件名字并且截取
	const fileName = key.slice(2, -3);
	//通过 context(key)导出文件内容
	const fileModule = context(key).default;
	moduleStores[fileName] = {
		...fileModule,
	};
});

export default new Vuex.Store({
	modules: {
		...moduleStores,
	},
	getters,
	plugins: [
		persistedState({
			key: 'uni_vuex_config_data', // 状态保存到本地的 key 
			storage: {
				getItem: key => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key, value),
				removeItem: key => uni.removeStorageSync(key)
			}
		})
	],
})
