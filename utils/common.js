
import store from '../store/index.js'

/**
 * 显示消息提示框
 * @param content 提示的标题
 */
export function toast(content, duration = 1500) {
	uni.showToast({
		icon: 'none',
		title: content,
		duration: duration
	})
}

/**
 * 显示模态弹窗
 * @param content 提示的标题
 */
export function showConfirm(content) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '提示',
			content: content,
			cancelText: '取消',
			confirmText: '确定',
			success: function(res) {
				resolve(res)
			}
		})
	})
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName]
		var part = encodeURIComponent(propName) + "="
		if (value !== null && value !== "" && typeof(value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']'
						var subPart = encodeURIComponent(params) + "="
						result += subPart + encodeURIComponent(value[key]) + "&"
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&"
			}
		}
	}
	return result
}


export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}

// 判断是否数字
export const isNumber = (val) => {
	return !isNaN(parseFloat(val));
}
export const formatNumber = (num, decimals = 2, decimal = '.', separator) => {
	// 将num转为Number类型，因为其值可能为字符串数值，调用toFixed会报错
	num = Number(num);
	num = num.toFixed(Number(decimals));
	num += '';
	const x = num.split('.');
	let x1 = x[0];
	const x2 = x.length > 1 ? decimal + x[1] : '';
	const rgx = /(\d+)(\d{3})/;
	if (separator && !isNumber(separator)) {
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + separator + '$2');
		}
	}
	return x1 + x2;
}

export function getSignPreDateTime(days) {
	let now = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * days);
	let year = now.getFullYear(); //得到年份
	let month = (now.getMonth() + 1).toString().padStart(2, "0"); //得到月份
	let day = now.getDate().toString().padStart(2, "0"); //得到日期
	let hours = now.getHours().toString().padStart(2, "0") // 得到小时;
	let minutes = now.getMinutes().toString().padStart(2, "0") // 得到分钟;
	let seconds = now.getSeconds().toString().padStart(2, "0") // 得到秒;
	return `${year}${month}${day}050308`;
}
// 邮箱校验
export function verifyEmail(str) {
	const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return regEmail.test(str)
}
// 手机号
export function verifyMobile(str) {
	const regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	return regMobile.test(str)
}

export function verifyPassword(str) {
	const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
	return regPassword.test(str)
}
// 是否为视频类型
export const isVideo = path => {
	return /\.(mp4|avi|wmv|mpg|mpeg|mov|rm|ram|swf|flv)/.test(path)
}
// 是否为图片类型
export const isImage = path => {
	return /\.(xbm|tif|pjp|svgz|jpg|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)/.test(path)
}

/**
 * 关于当前设备的机型系统信息
 */
export const getSystemInfo = () => {
	/****************** 所有平台共有的系统信息 ********************/
	// 设备系统信息
	let systemInfomations = uni.getSystemInfoSync()
	// 机型适配比例系数
	let scaleFactor = 750 / systemInfomations.windowWidth
	// 当前机型-屏幕高度
	let windowHeight = systemInfomations.windowHeight * scaleFactor //rpx
	// 当前机型-屏幕宽度
	let windowWidth = systemInfomations.windowWidth * scaleFactor //rpx
	// 状态栏高度
	let statusBarHeight = (systemInfomations.statusBarHeight) * scaleFactor //rpx

	// 导航栏高度  注意：此导航栏高度只针对微信小程序有效 其他平台如自定义导航栏请使用：状态栏高度+自定义文本高度
	let navHeight = 0 //rpx

	/****************** 微信小程序头部胶囊信息 ********************/
	// #ifdef MP-WEIXIN
	const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
	// 胶囊高度
	let menuButtonHeight = menuButtonInfo.height * scaleFactor //rpx
	// 胶囊宽度
	let menuButtonWidth = menuButtonInfo.width * scaleFactor //rpx
	// 胶囊上边界的坐标
	let menuButtonTop = menuButtonInfo.top * scaleFactor //rpx
	// 胶囊右边界的坐标
	let menuButtonRight = menuButtonInfo.right * scaleFactor //rpx
	// 胶囊下边界的坐标
	let menuButtonBottom = menuButtonInfo.bottom * scaleFactor //rpx
	// 胶囊左边界的坐标
	let menuButtonLeft = menuButtonInfo.left * scaleFactor //rpx

	// 微信小程序中导航栏高度 = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
	navHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2
	// #endif

	let info = {}

	// #ifdef MP-WEIXIN
	info = {
		scaleFactor,
		windowHeight,
		windowWidth,
		statusBarHeight,
		menuButtonHeight,
		menuButtonWidth,
		menuButtonTop,
		menuButtonRight,
		menuButtonBottom,
		menuButtonLeft,
		navHeight
	}
	// #endif

	// #ifndef MP-WEIXIN
	info = {
		scaleFactor,
		windowHeight,
		windowWidth,
		statusBarHeight
	}
	// #endif
	store.commit('SET_SYSTEM_INFO', info)
}


// 判断字符串是否为JSON格式
export function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            // console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    // console.log('It is not a string!')
}
/**
 * 生成一个用不重复的ID
 * @param { Number } randomLength 
 */
export function getUuiD(randomLength = null){
 return Number(Math.random().toString().substr(2,randomLength) + Date.now()).toString()
}

//姓名脱敏
export function formatName(name) {
    let newStr
    if (name.length === 2) {
        newStr = name.substr(0, 1) + '*'
    } else if (name.length > 2) {
        let char = ''
        for (let i = 0, len = name.length - 2; i < len; i++) {
            char += '*'
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1)
    } else {
        newStr = name
    }
    return newStr
}
