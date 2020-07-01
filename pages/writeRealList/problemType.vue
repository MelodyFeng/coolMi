<template>
	<view class="container">
		<view class="type-item">
			<view class="type-title">是否违标</view>
			<view class="type-button">
				<view>
					<view class="checked">全部</view>
				</view>
				<view>
					<view>违标</view>
				</view>
				<view>
					<view>不违标</view>
				</view>
			</view>
		</view>
		<view class="type-item">
			<view class="type-title">违标级别</view>
			<view class="type-button">
				<view>
					<view>全部</view>
				</view>
				<view>
					<view>H</view>
				</view>
				<view>
					<view>A</view>
				</view>
				<view>
					<view>B</view>
				</view>
				<view>
					<view>C</view>
				</view>
			</view>
		</view>
		<view class="type-item">
			<view class="type-title">违标类别</view>
		</view>
		<view class="type-item">
			<view class="type-title">违标条款</view>
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
		onLoad() {
			
		},
		//展示
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	.type-item{
		padding: 10rpx 20rpx;
		.type-title{
			height: 70rpx;
			line-height: 70rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
			font-weight: bolder;
			color: #000000;
			padding-left: 25rpx;

		}
		.type-button{
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			>view{
				width: 33.3%;
				height: 90rpx;
				padding: 0rpx 30rpx;
				view{
					min-width: 150rpx;
					line-height: 45rpx;
					height: 45rpx;
					opacity: 0.5;
					font-size: 26rpx;
					background: #b4b4b4;
					border-radius: 6rpx;
					text-align: center;
				}
			}
		}
	}
	
	.checked{
		background: $myBlue !important;
		color: #FFFFFF  !important;
	}
</style>

