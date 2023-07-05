<template>
	<view>
		<view class="tab_box">
			<u-subsection  :list="list" :current="current" mode="button" @change="sectionChange" fontSize="26rpx" activeColor="#e8704b" inactiveColor="#d73155" bgColor="#e47849"></u-subsection>
		</view>
		<view class="order_list">
			<u-empty v-if="dataList.length==0" marginTop="300rpx" mode="list" iconSize="200" textSize="30">
			</u-empty>
			<view v-else>
				123
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
					    name: '全部',
					}, {
					    name: '待自提',
					}, {
					    name: '已完成'
					}
				],
				dataList:[
					{	
						name:'商品名称',
						img: ''
					}
				],
				current:0
			}
		},
		onLoad() {

		},
		methods: {
			sectionChange(index){
				this.current=index
			}
		}
	}
</script>

<style lang="scss" scoped>
.tab_box{
	width: 100%;
	
}
.order_list{
	min-height: 500rpx;
}
/deep/.u-subsection--button__bar.data-v-244377f2{
	background-color: #f3a633 !important;
}
/deep/.u-subsection--button.data-v-244377f2{
	border-radius: 0;
}
</style>
