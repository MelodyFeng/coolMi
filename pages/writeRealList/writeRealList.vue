<template>
	<view :class="{containerList:hiddenFlag}">
		<view class="searchBar">
			<view @click="drawerDepart">
				<text>{{paramName.analyzeDepartName}}</text>
				<view class="blueLine" v-show="departLine"></view>
			</view>
			<view @click="drawerTime">
				<text :style="{'line-height':paramName.analyzeTime != '分析时间'?'30rpx':'65rpx'}">{{paramName.analyzeTime}}</text>
				<view class="blueLine" v-show="timeLine"></view>
			</view>
			<view @click="drawerType">
				<text>问题类型</text>
				<view class="blueLine"  v-show="typeLine"></view>
			</view>
		</view>
		<!-- 抽屉 -->
		<view>
			<!-- 抽屉 工区 -->
			<uni-drawer ref="departDrawer" width="650rpx" top="75rpx" @closeDrawer="closeDrawer" v-show="departLine">
			    <view style="height: 100%;">
					<departInfo @setSearchParam="setSearchParam"></departInfo>
			    </view>
			</uni-drawer>
			<!-- 工区时间 -->
			<analyzeTime ref="timeDrawer" top="75rpx" @closeDrawer="closeDrawer" @setSearchParam="setSearchParam"></analyzeTime>
			<!-- 抽屉 问题类型 -->
			<uni-drawer ref="typeDrawer" width="650rpx" mode="right" top="75rpx" @closeDrawer="closeDrawer" v-show="typeLine">
			    <view style="height: 100%;">
			        <problemType @setSearchParam="setSearchParam"></problemType>
			    </view>
			</uni-drawer>
		</view>
		<view class="card-box">
			<view v-for="(item,index) in rowData" :key="item.realId">
				<uni-card @click="showDetail(item.realId)" :title="item.isMisbrand == 1?item.problemItemName:'无违标问题'" is-shadow>
					<view class="card-content" style="float: left;width: 400rpx;">{{item.departName}}</view>
					<view class="card-content" style="float: right;">{{formatDate(item.analyzeDate)}}</view>
				</uni-card>
			</view>
		</view>
		<view class="lastMsg" v-show="lastPageFlag">
			<text>没有更多内容</text>
		</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import departInfo from "./departInfo.vue"
	import problemType from "./problemType.vue"
	import analyzeTime from "./analyzeTime.vue"
	export default {
		components: {uniDrawer,departInfo,problemType,analyzeTime},
		data(){
			return{
				searchParam:{
					analyzeStartDate:'',//分析开始时间
					analyzeEndDate:'',//分析结束时间
					analyzeDepartId:'',//分析工区
					isMisbrand:'',//是否违标
					problemLevel:'',//违标级别
					problemTypeId:'',//违标类别
					itemId:'',//违标条款
					page:1
				},//查询条件
				rowData:[],
				oldRowData:[],//缓存列表数据
				departLine:false,
				timeLine:false,
				typeLine:false,
				lastPageFlag:false,
				hiddenFlag:false,
				paramName:{
					analyzeDepartName:'分析工区',
					analyzeTime:'分析时间'
				}
			}
		},
		methods:{
			formatDate(str,format) {
				let date;
				if(str){
					date = new Date(str);
				} else {
					date = new Date();
				}
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let	hours = date.getHours();
				let minutes = date.getMinutes();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				hours = hours > 9 ? hours : '0' + hours;;
				minutes = minutes > 9 ? minutes : '0' + minutes;
				if(format == 'yyyy-MM-dd'){
					return `${year}-${month}-${day}`;
				}
				if(format == 'yyyy-MM'){
					return `${year}-${month}`;
				}
				if(format == 'yyyy-MM-dd HH:mm'){
					return `${year}-${month}-${day} ${hours}:${minutes}`;
				}
				return `${year}-${month}-${day} ${hours}:${minutes}`;
			},
			//打开分析工区查询条件
			drawerDepart(){
				this.$refs.departDrawer.open();
				if(this.typeLine){
					this.$refs.typeDrawer.close();
				}
				if(this.timeLine){
					this.$refs.timeDrawer.close();
				}
				this.departLine = true;
				this.hiddenFlag = true;
			},
			//打开问题类型查询条件type
			drawerType(){
				if(this.departLine){
					this.$refs.departDrawer.close();
				}
				if(this.timeLine){
					this.$refs.timeDrawer.close();
				}
				this.$refs.typeDrawer.open();
				this.typeLine = true;
				this.hiddenFlag = true;
			},
			//打开问题类型查询条件type
			drawerTime(){
				this.$refs.timeDrawer.open();
				if(this.departLine){
					this.$refs.departDrawer.close();
				}
				if(this.typeLine){
					this.$refs.typeDrawer.close();
				}
				this.timeLine=true;
				this.hiddenFlag = true;
			},
			//搜索写实列表
			searchList(){
				uni.showLoading();
				this.$http.request({
					url:this.$url.getWriteRealList,
					data: this.searchParam
				}).then(res => {
					uni.hideLoading();
					if(res.errcode == 1){
						//判断是否最后一页
						if(this.searchParam.page == res.data.total){
							this.rowData = this.oldRowData.concat(res.data.rows);
							this.lastPageFlag = true;
						} else {
							this.lastPageFlag = false;
							this.searchParam.page = this.searchParam.page + 1
							this.rowData = this.oldRowData.concat(res.data.rows);
							this.oldRowData = this.rowData;
						}
					} else{
						uni.showToast({
							icon:'none',
							title:res.message
						})
					}				
				})
			},
			closeDrawer(){
				this.departLine = false;
				this.timeLine = false;
				this.typeLine = false;
				this.hiddenFlag = false;
			},
			//设置搜索条件
			setSearchParam(obj){
				this.$refs.departDrawer.close();
				this.$refs.timeDrawer.close();
				this.$refs.typeDrawer.close();
				//清空查询数据
				this.lastPageFlag = false;
				this.rowData = [];
				this.oldRowData = [];
				if(obj.analyzeStartDate){
					this.searchParam.analyzeStartDate = obj.analyzeStartDate;
				}
				if(obj.analyzeEndDate){
					this.searchParam.analyzeEndDate = obj.analyzeEndDate;
					this.paramName.analyzeTime = obj.analyzeStartDate +'\n' +obj.analyzeEndDate;
				}
				if(obj.analyzeDepartId){
					this.searchParam.analyzeDepartId = obj.analyzeDepartId;
					this.paramName.analyzeDepartName = obj.analyzeDepartName;
				}
				if(obj.isMisbrand){
					this.searchParam.isMisbrand = obj.isMisbrand;
				}				
				if(obj.problemLevel){
					this.searchParam.problemLevel = obj.problemLevel;
				}
				if(obj.problemTypeId){
					this.searchParam.problemTypeId = obj.problemTypeId;
				}
				if(obj.itemId){
					this.searchParam.itemId = obj.itemId;
				}
				this.searchParam.page = 1
				this.searchList()
			},
			//展示详情
			showDetail(realId){
				uni.navigateTo({
					url:'/pages/writeRealDetail/writeRealDetail?realId='+realId
				})
			}
		},
		// 加载
		onLoad() {
			this.searchList();
		},
		//触底触发
		onReachBottom(){
			this.searchList();
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $gayBgc;
		height: 100%;
	}
	
	.containerList{
		height: 100%;
		overflow: hidden;
	}
	
	.searchBar{
		display: flex;
		width: 750rpx;
		height: 65rpx;
		line-height: 65rpx;
		background-color: #FFFFFF;
		position: fixed;
		top: 0rpx;
		width: 100%;
		z-index: 9999;
		> view{
			width: 33.3%;
			text-align: center;
			height: 50rpx;
			font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
			font-weight: 400;
			color: #000000;
			position: relative;
			text{
				font-size: 25rpx;
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				word-break: break-all;
				display: inline-block;
			}
		}
	}
	
	.blueLine{
		background: $myBlue;
		margin: 0rpx 50rpx;
		width: 156rpx;
		height: 10rpx;
		flex: 1;
		position: absolute;
		top: 65rpx;
		left: -5rpx;
	}
	
	.card-box{
		padding-top: 70rpx;
	}
	
	.card-content{
		font-size: 25rpx;
		font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
		font-weight: 400;
		text-align: left;
		color: #267cfb;
	}
	.lastMsg{
		text-align: center;
		font-size: 25rpx;
		color: #c3c3c3;
		height: 70rpx;
	}
</style>
