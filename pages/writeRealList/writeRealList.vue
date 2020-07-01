<template>
	<view class="container">
		<view class="searchBar">
			<view @click="drawerDepart">
				<text>分析工区</text>
				<view class="blueLine" v-show="departLine"></view>
			</view>
			<view @click="drawerTime">
				<text>分析时间</text>
				<view class="blueLine" v-show="timeLine"></view>
			</view>
			<view @click="drawerType">
				<text>问题类型</text>
				<view class="blueLine"  v-show="typeLine"></view>
			</view>
		</view>
		<!-- 抽屉 -->
		<view>
			<uni-drawer ref="departDrawer" width="650rpx" top="75rpx">
			    <view style="height: 100%;">
					<departInfo></departInfo>
			    </view>
			</uni-drawer>
			<!-- 抽屉 问题类型 -->
			<uni-drawer ref="typeDrawer" width="650rpx" mode="right" top="75rpx">
			    <view style="height: 100%;">
			        <problemType></problemType>
			    </view>
			</uni-drawer>
		</view>
		<view class="card-box">
			<view v-for="(item,idex) in rowData" :key="item.realId">
				<uni-card :title="item.isMisbrand == 1?item.problemItemName:'无标注问题'" is-shadow>
					<view class="card-content" style="float: left;width: 400rpx;">{{item.departName}}</view>
					<view class="card-content" style="float: right;">{{formatDate(item.analyzeDate)}}</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import departInfo from "./departInfo.vue"
	import problemType from "./problemType.vue"
	export default {
		components: {uniDrawer,departInfo,problemType},
		data(){
			return{
				rowData:{},
				departLine:false,
				timeLine:false,
				typeLine:false
			}
		},
		methods:{
			//打开分析工区查询条件
			drawerDepart(){
				this.departLine=true,
				this.timeLine=false,
				this.typeLine=false
				this.$refs.typeDrawer.close();
				this.$refs.departDrawer.open()
			},
			//打开问题类型查询条件type
			drawerType(){
				this.departLine=false,
				this.timeLine=false,
				this.typeLine=true
				this.$refs.departDrawer.close();
				this.$refs.typeDrawer.open()
			}
		},
		// 加载
		onLoad() {
			
		},
		//展示
		onShow() {
			
		},
		//触底触发
		onReachBottom(){
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $gayBgc;
	}
	.searchBar{
		display: flex;
		width: 750rpx;
		height: 65rpx;
		line-height: 65rpx;
		background-color: #FFFFFF;
		> view{
			flex: 1;
			text-align: center;
			height: 25rpx;
			font-size: 25rpx;
			font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
			font-weight: 400;
			color: #000000;
		}
	}
	
	.blueLine{
		background: $myBlue;
		margin: 0rpx 50rpx;
		width: 156rpx;
		height: 10rpx;
		flex: 1;
	}
</style>
