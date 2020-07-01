<template>
	<view class="container">
		<view v-if="flag">
			<view class="logo">
				<image :src="logoURL" ></image>
			</view>
			<view class="title">
				<text>{{title}}</text>
			</view>
			<view class="loginInfo">
				<view class="uni-input-item">
					<view class="icon-item"><image src="../../static/img/user.png"></image></view>
					<input type="text" value="" class="uni-input" placeholder="请输入账号" placeholder-class="phcolor" v-model="account"/>
					<view class="icon-item-lock" v-if="account" @click="removeInput('account')"><image src="../../static/img/cancel.png"></image></view>
				</view>
				<view class="uni-input-item">
					<view class="icon-item"><image src="../../static/img/lock.png" ></image></view>
					<input type="text" value="" class="uni-input" placeholder="请输入密码" password placeholder-class="phcolor"  v-model="password"/>
					<view class="icon-item-lock" v-if="password" @click="removeInput('passwd')"><image src="../../static/img/cancel.png" ></image></view>
				</view>
				<view class="uni-button-item">
					<button type="primary" @click="loginIn">登录</button>
				</view>
				<view class="errmsg">
					<text>{{errmsg}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../node_modules/md5/md5'
	export default {
		data() {
			return {
				logoURL:'',
				title:'',
				account:'',
				password:'',
				flag:false,
				errCode:null,
				errmsg:''
			}
		},
		methods: {
			// 移除密码和帐号
			removeInput(type){
				if(type == 'account'){
					 this.account = '';
				} else {
					this.passwd = '';
				}
			},
			// 登录请求
			loginIn(){
				//判断用户名密码不能空
				if(this.account == ''){
					uni.showToast({
						icon:'none',
						title:'请输入帐号'
					})
					return;
				}
				if(this.password  == ''){
					uni.showToast({
						icon:'none',
						title:'请输入密码'
					})
					return;
				}
				uni.showToast({
					icon:'loading'
				})
				this.$http.request({
						url: this.$url.logIn,
						data:{
							userName: this.account,
							passWord: md5(this.password)
						}
					}).then(res =>{
						if(res.errcode == 1){
							//用户信息存入storage
							uni.setStorage({
									key: 'userInfo',
									data: res.data,
									success: _ => {
										//成功跳转到首页
										uni.switchTab({
											url:'/pages/index/index'
										})
									}
								})
	
						}  else {
							uni.showToast({
								icon:'none',
								title: res.message
							})
						}
					});
			}
		},
		onLoad(e) {
			if(e.errcode == 400){
				this.errCode = 400;
				this.errmsg = '*登录态已失效，请重新登录';
			}
			if(e.errcode == 402){
				this.errCode = 402;
				this.errmsg = '*该账号已在其他小程序登录，同一时间只能保持一处登录';
			}
			this.$http.request({
					url: this.$url.getLogo,
				}).then(res =>{
					if(res.errcode == 1){
						this.logoURL = this.$http.baseURL + res.data.loginLogo;
						this.title = res.data.systemName;
					} else{
						this.logoURL = '../../static/img/gddlogo.png';
						this.title = '监控分析量化管理平台';						
					}
					this.flag = true;
				});			
		}
	}
</script>

<style lang="scss">
		
.container{
    width: 100%;
	}

.logo{
	width: 100%;
	margin-top: 30px;
	text-align: center;
	image{
		width: 245rpx;
		height: 245rpx;
	}
}

.title{
	font-size: 36rpx;
	font-family: Adobe Heiti Std R, Adobe Heiti Std R-R;
	font-weight: bolder;
	text-align: center;
	color: #494949;
}

.loginInfo{
	margin: 68rpx;
	.uni-input-item{
		position: relative;
		// 图标
		.icon-item{
			position: absolute;
			top: 20rpx;
			left: 25rpx;
			image{
				width: 38rpx;
				height: 40rpx;
			}
		}
		.icon-item-lock{
			position: absolute;
			top: 19rpx;
			right: 25rpx;
			width: 27rpx;
			height: 40rpx;
			z-index: 999;
			image{
				width: 27rpx;
				height: 29rpx;
			}
		}
		.uni-input{
			width: 613rpx;
			height: 80rpx;
			border: 2rpx solid #267cfb;
			border-radius: 40rpx;
			margin-bottom: 60rpx;
			padding-left: 70rpx;
		}
		.phcolor{
		       /* placeholder颜色  */
		       color: #aab2bd;
		       /* placeholder字体大小  */
		       font-size: 12px;
			   font-weight: bolder;
		    }
	}
	.uni-button-item button{
		width: 620rpx;
		height: 80rpx;
		background: #267cfb;
		border-radius: 40rpx;
		line-height: 80rpx;
		margin-top: 108rpx;
	}
}

.errmsg{
	height: 57rpx;
	font-size: 27rpx;
	font-family: Adobe Heiti Std R, Adobe Heiti Std R-R;
	text-align: left;
	color: #e60012;
	line-height: 40rpx;
	padding: 15rpx;
}
</style>
