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
			<view class="type-button">
				<view>
					<view :class="{checked:checkedproblemTypeId == -1}" @click="checkProblemType(-1,-1)">全部</view>
				</view>
				<view v-for="(item,index) in problemTypes" :key="item.problemTypeId" >
					<view @click="checkProblemType(item.problemTypeId,index)" :class="{checked:checkedproblemTypeId == item.problemTypeId}" >{{item.problemTypeName}}</view>
				</view>
			</view>
		</view>
		<view class="type-item"  v-show="checkedproblemTypeId != -1 && problemItems.length > 0">
			<view class="type-title">违标条款</view>
			<view class="type-button">
				<view>
					<view :class="{checked:checkedproblemItemId == -1}" @click="checkProblemItem(-1,-1)">全部</view>
				</view>
				<view v-for="(item,index) in problemItems" :key="item.itemId"  >
					<view @click="checkProblemItem(item.itemId,index)" :class="{checked:checkedproblemItemId == item.itemId}">{{item.itemName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				problemTypes:[],
				problemItems:[],
				checkedproblemTypeId: -1,
				checkedproblemItemId: -1
			}
		},
		methods:{
			checkProblemType(problemTypeId,index){
				if(index === -1){
					this.problemItems = [];
				} else{	
					this.problemItems = this.problemTypes[index].problemItems;
				}
				this.checkedproblemTypeId = problemTypeId;
				this.checkedproblemItemId = -1;
			},
			checkProblemItem(problemItemId,index){
				this.checkedproblemItemId = problemItemId;
			},
		},
		// 加载
		created() {
			//获取组织架构
			this.$http.request({
				url:this.$url.getProblemTypes
			}).then(res => {
				if(res.errcode == 1){
					this.problemTypes = res.data.problemTypes
				} else {
					uni.showToast({
						icon:'none',
						title:'获取问题类型失败'
					})
				}
			})
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
				height: 80rpx;
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
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					word-break: break-all;
					padding: 0px 10rpx;
				}
			}
		}
	}
	
	.checked{
		background: $myBlue !important;
		color: #FFFFFF  !important;
	}
</style>

