const getters = {
	systemInfo: state => state.common.systemInfo,
	userInfo: state => state.user.userInfo,
	proid:state => state.user.proid,
	uid:state => state.user.uid,
}
export default getters
