<template>
	<view class="container">
		<!-- 数据展示模块 -->
		<view class="data-container">
			<!-- 姓名日期 -->
			<view class="top-box">
				<view class="user-info">{{userInfo.userName}}</view>
				<view class="month-info">
					<picker mode="date" :value="statMonth" fields="month" @change="dateChange">
						<view>{{statMonth}}▼</view>
					</picker>
				</view>
			</view>
			<!-- 数据总数展示 -->
			<view class="middle-box">
				<!-- 数据分析 -->
				<view>
					<view><text>数据分析</text></view>
					<view class="middle-data" style="border-right: 1px solid #FFFFFF;">
						<text>{{report.analyseCount}}</text>
						<text>{{report.analyseFinish}}</text>
					</view>
					<view class="middle-data-name">
						<text>定量</text>
						<text>完成</text>
					</view>
				</view>
				<!-- 检查问题 -->
				<view>
					<view><text>检查问题</text></view>
					<view class="middle-data">
						<text>{{report.checkCount}}</text>
						<text>{{report.checkFinish}}</text>
					</view>
					<view class="middle-data-name">
						<text>定量</text>
						<text>完成</text>
					</view>			
				</view>
			</view>
			<view class="bottom-box">
				<view class="table-name">
					<view>定量</view>
					<view>完成</view>
				</view>
				<view class="table-data">
					<ul style="font-size:28rpx;"> 
						<li>H</li>
						<li>A</li>
						<li>B</li>
						<li>C</li>
					</ul>
					<ul style="font-size:40rpx;color: #267CFB;">
						<li>{{report.hCount}}</li>
						<li>{{report.aCount}}</li>
						<li>{{report.bCount}}</li>
						<li>{{report.cCount}}</li>
					</ul>
					<ul style="font-size:40rpx;">
						<li :style="{'color':(report.hCount <= report.hFinish)?'black':'red'}">{{report.hFinish}}</li>
						<li :style="{'color':(report.aCount <= report.aFinish)?'black':'red'}">{{report.aFinish}}</li>
						<li :style="{'color':(report.bCount <= report.bFinish)?'black':'red'}">{{report.bFinish}}</li>
						<li :style="{'color':(report.cCount <= report.cFinish)?'black':'red'}">{{report.cFinish}}</li>
					</ul>
				</view>
			</view>
		</view>
		<!-- 检查记录 -->
		<view class="check-history" @click="openWriteRealListPage">
			<view>
				<text>检查记录</text>
			</view>
			<view>
				<text>更多</text>
				<image src="../../static/img/right.png" mode=""></image>
			</view>
		</view>
		<view class="card-box">
			<view v-for="(item,idex) in rowData" :key="item.realId">
				<uni-card :title="item.isMisbrand == 1?item.problemItemName:'无违标问题'" is-shadow>
					<view class="card-content" style="float: left;width: 400rpx;">{{item.departName}}</view>
					<view class="card-content" style="float: right;">{{formatDate(item.analyzeDate)}}</view>
				</uni-card>
			</view>
		</view>
		<myTabbar :current-page="0"></myTabbar>  
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {uniCard},
		data() {
			const currentDate = this.formatDate(false,'yyyy-MM');
			return {
				userInfo:{},//用户信息
				statMonth: currentDate,
				report:{},//量化数据
				rowData:{}//最新检查记录
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getUserRationReport();
			this.getTopWriteReals();
			setTimeout(() => { uni.stopPullDownRefresh()},1000)
		},
		methods: {
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
			//获取当前用户安全检查量化完成情况
			getUserRationReport(){
				uni.showLoading();
				this.$http.request({
							url: this.$url.getUserRationReport,
							data:{
								statMonth:this.statMonth
							},
						}).then(res =>{
							uni.hideLoading();
							this.report = res.data.report;
						})
			},
			//获取当前用户最近5条记录
			getTopWriteReals(){
				uni.showLoading();
				this.$http.request({
							url: this.$url.getTopWriteReals,
							data:{
								statMonth:this.statMonth
							},
						}).then(res =>{
							this.rowData = res.data.rows;
						})
			},
			//改变时间
			dateChange(e){
				this.statMonth = e.target.value;
				this.getUserRationReport();
				this.getTopWriteReals();
			},
			//查看更多写实信息
			openWriteRealListPage(){
				uni.navigateTo({
					url:'/pages/writeRealList/writeRealList'
				})
			}
		},
		onLoad() {
			uni.hideTabBar();
			uni.getStorage({
				key: 'userInfo',
				success:  res => {
					this.userInfo = res.data;
				}
			})
			//获取当前用户安全检查量化完成情况
			this.getUserRationReport()
			//获取当前用户最近5条记录
			this.getTopWriteReals()		
		}
	}
</script>

<style lang="scss">
page{
	background: #f3f3f3;
}	
	
.container{
	background-color: #f3f3f3;
	height: 100%;
	padding-bottom: 130rpx;
}

.data-container{
	width: 750rpx;
	height: 600rpx;
	background-image: linear-gradient(#267cfb 50%, #FFFFFF);
	border-bottom: 1px solid #FFFFFF;
	padding-top: 10rpx;
.top-box{
	height: 90rpx;
	position: relative;
	font-weight: bolder;
	color: $myBlue;
	font-size: 30rpx;
	.user-info{
		position: absolute;
		left: 28rpx;
		padding: 15rpx 20rpx;
		border-radius: 6rpx;
		color: #FFFFFF;
		border: 1px solid #FFFFFF;
		width: 180rpx;
		text-align: center;
	}
	.month-info{
		position: absolute;         
		right: 28rpx;
		padding: 15rpx 20rpx;
		border-radius: 6rpx;
		color: #FFFFFF;
		border: 1px solid #FFFFFF;
		width: 210rpx;
		text-align: center;
	}
}
// 中间数据
.middle-box{
	display: flex;
	color: #FFFFFF;
	font-size: 31rpx;		
	font-weight: bolder;
	text-align: center;
	padding-top: 20rpx;
	> view {
		flex: 1;
	}
	.middle-data{
		padding: 5rpx;
		font-size: 70rpx;
		margin: 10rpx 0rpx;
		font-size: 69rpx;
		font-weight: 400;
		font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
		text{
			display: inline-block;
			width: 150rpx;
			text-align: center;
		}
	}
	.middle-data-name{
		text{
			font-size: 25rpx;
			display: inline-block;
			width: 150rpx;
			text-align: center;
		}
	}
}
//底部数据
.bottom-box{
		width: 590rpx;
		height: 200rpx;
		background: #ffffff;
		box-shadow: 1px 2px 5px #d6d6d6;;
		margin: 50rpx 80rpx;
		border-radius: 10rpx;
		text-align: center;
		.table-name{
			float: left;
			width: 150rpx;
			height: 200rpx;
			padding-top: 70rpx;
			font-weight: bolder;
			view{
				height: 61rpx;
			}
		}
		.table-data{
			padding-left: 150rpx;
			ul > li {
				float: left;
				width: 95rpx;
				padding: 3rpx;
				height: 61rpx;
				line-height: 61rpx;
			}
			ul:first-child {
				font-weight: bold;
			}
		}
	}
}

.check-history{
	width: 750rpx;
	height: 72rpx;
	background: #FFFFFF;
	margin: 25rpx 0px;
	font-size: 27rpx;
	font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
	font-weight: 400;
	view:first-child{
		margin: 17rpx 25rpx;
		float: left;
		padding: 0rpx 25rpx;
		border-left: 3px solid $myBlue;
		font-size: 27rpx;
		font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
		font-weight: 400;
	}
	view:last-child{
		margin: 15rpx 25rpx;
		float: right;
	}
	image{
		width: 10rpx;
		height: 25rpx;
		margin-left: 20rpx;
		position: relative;
		top: 3rpx;
	}
}

.card-content{
	font-size: 25rpx;
	font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
	font-weight: 400;
	text-align: left;
	color: #267cfb;
}



</style>
