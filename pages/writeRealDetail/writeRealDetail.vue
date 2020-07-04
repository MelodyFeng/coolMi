<template>
	<view class="container">
		<view class="detail-page">
			<ul>
				<li>
					<text></text>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		// 加载
		onLoad(realId) {
			console.log(realId);
		},
	}
</script>

<style lang="scss">
	page{
		background-color: $gayBgc;
	}
	.container{
		padding: 30rpx 40rpx;
		.detail-page{
			background: #FFFFFF;
			border-radius: 15rpx;
			border:1px solid black;
		}
	}
</style>

