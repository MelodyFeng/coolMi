<template>
	<view class="container">
		<view class="bgImg">
			<image src="../../static/img/oval.png" mode=""></image>
		</view>
		<view class="userInfo-item">
			<view class="user-Info">
				<view class="user-name">
					<view>
						<image src="../../static/img/headImg.png" mode=""></image>
					</view>
					<view>
						<text>{{userInfo.userName}}</text>
					</view>
				</view>
				<view class="user-ul">
					<ul>
						<li>
							<image src="../../static/img/filer.png" mode=""></image>
							<text>{{userInfo.job}}</text>
						</li>
						<li>
							<image src="../../static/img/depart.png" mode=""></image>
							<text>{{userInfo.workareaName || userInfo.workshopName ?(userInfo.workareaName+userInfo.workshopName): userInfo.worksectionName}}</text>
						</li>
						<li>
							<image src="../../static/img/phone.png" mode=""></image>
							<text>{{userInfo.mobile}}</text>
						</li>
					</ul>
				</view>
			</view>
		</view>
		<view class="more-item">
			<ul>
				<li @click="openUpdatePasswdPage">
					<text>修改密码</text>
					<image src="../../static/img/right_gay.png"></image>
				</li>
			</ul>
		</view>	
		<view>
			<button class="loginOutBtn"  @click="loginOut">退出登录</button>
		</view>
		<myTabbar :current-page="2"></myTabbar>  
	</view>
</template>

<script>
	export default {
		data(){
			return{
				userInfo:{}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods:{
			//修改密码
			openUpdatePasswdPage(){
				uni.navigateTo({
					url:'/pages/updatePasswd/updatePasswd'
				})
			},
			//退出登录
			loginOut(){
				uni.showModal({
				    title: '提示',
				    content: '确定退出当前用户',
				    success: res => {
				        if (res.confirm) {
				            this.$http.request({
				            		url: this.$url.logOut,
				            	}).then(res =>{
				            		if(res.errcode == 1){
				            			uni.redirectTo({
				            				url:'/pages/login/login',
				            				success(res){
				            					uni.removeStorageSync('userInfo');
				            				},
				            			})
				            		}else{
				            			uni.showToast({
				            				icon:'none',
				            				title:res.message
				            			});
				            		}
				            	});	
				        }
				    }
				});
				
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #FFFFFF;
}	
	
.container{
	height: 100%;
	padding-bottom: 130rpx;
	position: relative;
}

.bgImg{
	width: 750rpx;
	height: 430rpx;
	image{
		width: 750rpx;
		height: 250rpx;
	}
}


.userInfo-item{
	width: 750rpx;
	position: absolute;
	top: 100rpx;
	padding: 0rpx 25rpx 10rpx;
	font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
	.user-Info{
		background-color: #FFFFFF;
		height: 330rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 5px #999;
		margin-bottom: 25rpx;
		.user-name{
			float: left;
			height: 330rpx;
			width: 290rpx;
			border-radius: 20rpx;
			text-align: center;
			image{
				width: 110rpx;
				height: 110rpx;
				margin-top: 50rpx;
				margin-bottom: 25rpx;

			}
			text{
				font-weight: bolder;
				font-size: 40rpx;
			}
		}
		.user-ul{
			width: 390rpx;
			height: 330rpx;
			float: left;
			padding-top: 65rpx;
			padding-left: 10rpx;
			ul li{
				height: 85rpx;
				position: relative;
				padding-left: 75rpx;
				font-size: 30rpx;
				image{
					position: absolute;
					width: 35rpx;
					height: 35rpx;
					top: 2px;
					left: 2rpx;
				}
			}
		}
	}

	.updatePasswd{
		position: absolute;
		text-align: center;
		color: $myBlue;
		bottom: 10rpx;
		width: 610rpx;
	}
	
}

.loginOutBtn {
	background: $myBlue;
	line-height: 80rpx;
	margin-top: 108rpx;
	width: 710rpx;
	color: #FFFFFF;
}

.mr20{
	margin-right: 20rpx;	
}

.more-item{
	height: 300rpx;
	margin-top: 30rpx;
	padding: 0rpx 70rpx;
	ul li {
		height: 100rpx;
		line-height: 100rpx;
		padding: 0rpx 40rpx;
		border-bottom: 1px solid #e3e3e3;
		text{
			width: 107rpx;
			height: 27rpx;
			font-size: 27rpx;
			font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
			font-weight: 400;
			text-align: left;
			color: #000000;
		}
	}
	image{
		width: 13rpx;
		height: 28rpx;
		float: right;
		padding-top: 18px;

	}
}
</style>
