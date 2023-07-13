<script>
	export default {
		onLaunch: function(options) {
			console.log('App Launch',options.query)
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
