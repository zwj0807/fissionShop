import request from '@/utils/request'

// export function balanceRecordsPage(pageNum, pageSize) {
// 	return request({
// 		url: `/ybyx/balanceRecord/listPage?pageNum=${pageNum}&pageSize=${pageSize}`,
// 		method: 'get',
// 	})
// }
// export function rechargeBalance(data) {
// 	return request({
// 		url: `/ybyxBalance/userChange`,
// 		method: 'post',
// 		data: data
// 	})
// }

//大转盘奖品信息
export function activity_details(data){
	return request({
		url: `/Activity/activity_details`,
		method: 'post',
		data: data
	})
}
//大转盘抽奖
export function activity_smoke(data){
	return request({
		url: `/Activity/smoke`,
		method: 'post',
		data: data
	})
}
//产品详情以及大转盘是否出现
export function product_details(data) {
	return request({
		url: `/product/product_details`,
		method: 'post',
		data: data
	})
}
//当前用户信息
export function current_user(data) {
	return request({
		url: `/user/current_user`,
		method: 'post',
		data: data
	})
}