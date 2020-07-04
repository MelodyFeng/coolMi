<template>
	<view class="container">
		<view class="type-item">
			<view class="type-title">是否违标</view>
			<view class="type-button">
				<view>
					<view @click="checkIsMisbrand('')" :class="{checked:isMisbrandId === ''}">全部</view>
				</view>
				<view>
					<view @click="checkIsMisbrand(1)" :class="{checked:isMisbrandId === 1}">违标</view>
				</view>
				<view>
					<view @click="checkIsMisbrand(0)" :class="{checked:isMisbrandId === 0}">不违标</view>
				</view>
			</view>
		</view>
		<view class="type-item">
			<view class="type-title">违标级别</view>
			<view class="type-button">
				<view>
					<view @click="checkProblemLevel('')" :class="{checked:problemLevelId == ''}">全部</view>
				</view>
				<view>
					<view @click="checkProblemLevel(1)" :class="{checked:problemLevelId == 1}">H</view>
				</view>
				<view>
					<view @click="checkProblemLevel(2)" :class="{checked:problemLevelId == 2}">A</view>
				</view>
				<view>
					<view @click="checkProblemLevel(3)" :class="{checked:problemLevelId == 3}">B</view>
				</view>
				<view>
					<view @click="checkProblemLevel(4)" :class="{checked:problemLevelId == 4}">C</view>
				</view>
			</view>
		</view>
		<view class="type-item">
			<view class="type-title">违标类别</view>
			<view class="type-button">
				<view>
					<view :class="{checked:checkedproblemTypeId === ''}" @click="checkProblemType('','')">全部</view>
				</view>
				<view v-for="(item,index) in problemTypes" :key="item.problemTypeId" >
					<view @click="checkProblemType(item.problemTypeId,index)" :class="{checked:checkedproblemTypeId == item.problemTypeId}" >{{item.problemTypeName}}</view>
				</view>
			</view>
		</view>
		<view class="type-item"  v-show="checkedproblemTypeId !== '' && problemItems.length > 0">
			<view class="type-title">违标条款</view>
			<view class="type-button">
				<view>
					<view :class="{checked:checkedproblemItemId === ''}" @click="checkProblemItem('','')">全部</view>
				</view>
				<view v-for="(item,index) in problemItems" :key="item.itemId"  >
					<view @click="checkProblemItem(item.itemId,index)" :class="{checked:checkedproblemItemId == item.itemId}">{{item.itemName}}</view>
				</view>
			</view>
		</view>
		<view class="time-btn">
			<view style="background: #FFFFFF;border-top: 1px solid #d2d2d2;" @click="resetType">
				<text>重 置</text>
			</view>
			<view style="background: #267cfb;color: #FFFFFF;" @click="confirmType">
				<text>确 定</text>
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
				checkedproblemTypeId: '',
				checkedproblemItemId: '',
				isMisbrandId: '',
				problemLevelId: ''
			}
		},
		methods:{
			checkProblemType(problemTypeId,index){
				if(index == ''){
					this.problemItems = [];
				} else{	
					this.problemItems = this.problemTypes[index].problemItems;
				}
				this.checkedproblemTypeId = problemTypeId;
				this.checkedproblemItemId = '';
			},
			checkProblemItem(problemItemId,index){
				this.checkedproblemItemId = problemItemId;
			},
			checkIsMisbrand(id){
				this.isMisbrandId = id;
			},
			checkProblemLevel(id){
				this.problemLevelId = id;
			},
			resetType(){
				this.checkedproblemTypeId = '',
				this.checkedproblemItemId = '',
				this.isMisbrandId = '',
				this.problemLevelId = ''
			},
			confirmType(){
				this.$emit('setSearchParam',{
					isMisbrand:this.isMisbrandId,//是否违标
					problemLevel:this.problemLevelId,//违标级别
					problemTypeId:this.checkedproblemTypeId,//违标类别
					itemId:this.checkedproblemTypeId,//违标条款
				});
			}
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
	.container{
		overflow-y: auto;
		height: 100%;
		padding-bottom: 40rpx;
	}
	
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
	
	.time-btn{
		display: flex;
		position: absolute;
		bottom: 0rpx;
		height: 60rpx;
		width: 100%;
		text-align: center;
		view{
			flex: 1;
			line-height: 60rpx;
		}
	}
</style>

