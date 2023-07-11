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
//红包排行|邀请记录
export function red_envelope(data) {
	return request({
		url: `/envelope/red_envelope_ranking_login`,
		method: 'post',
		data: data
	})
}
//购买下单
export function place_order(data) {
	return request({
		url: `/order/place_order`,
		method: 'post',
		data: data
	})
}
//提现申请
export function withdrawal_record(data) {
	return request({
		url: `/withdrawal/withdrawal_record`,
		method: 'post',
		data: data
	})
}
//提现列表
export function withdrawal_list(data) {
	return request({
		url: `/withdrawal/withdrawal_list`,
		method: 'post',
		data: data
	})
}
//我的订单
export function ordre_list(data) {
	return request({
		url: `/order/ordre_list`,
		method: 'post',
		data: data
	})
}
//邀请记录
export function invite_list(data) {
	return request({
		url: `/my/invite_list`,
		method: 'post',
		data: data
	})
}
//红包记录
export function red_envelope_list(data) {
	return request({
		url: `/my/red_envelope_list`,
		method: 'post',
		data: data
	})
}
//切换店铺
export function login_shop_list(data) {
	return request({
		url: `/my/login_shop_list`,
		method: 'post',
		data: data
	})
}