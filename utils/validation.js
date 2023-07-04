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
// 密码
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
