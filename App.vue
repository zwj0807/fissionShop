<script>
	import {
		getSystemInfo
	} from '@/utils/common.js'
	export default {
		onLaunch: function(options) {
			console.log('App Launch > options',options.query)
			getSystemInfo()
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},
		methods:{
			
		}
	}
</script>

<style>
	page{
		background-color: #e6e6e6;
	}
</style>
<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss"
</style>
