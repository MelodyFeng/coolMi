<template>
	<view class="container">
		<view class="input-item">
			<view class="bbl">
				<text>旧密码</text>
			</view>
			<view>
				<input type="p" v-model="oldPasswd" placeholder="请输入旧密码" placeholder-class="phstyle" password/>
			</view>
		</view>
		<view class="input-item">
			<view class="bbl">
				<text>新密码</text>
			</view>
			<view>
				<input type="text" v-model="newPasswd1" placeholder="请输入新密码" placeholder-class="phstyle" password/>
				<input type="text" v-model="newPasswd2" placeholder="请确认新密码" placeholder-class="phstyle" password/>
			</view>
		</view>
		<view class="errmsg" v-show="errFlag">
			<text>{{errMsg}}</text>
		</view>
		<view>
			<button class="btn_blue" @click="submitUpdate">确定修改</button>
		</view>
	</view>
</template>

<script>
	import md5 from '../../node_modules/md5/md5'
	export default {
		data(){
			return{
				oldPasswd:'',
				newPasswd1:'',
				newPasswd2:'',
				errFlag:false,
				errMsg:'新密码前后输入不一致'
			}
		},
		methods:{
			//提交密码
			submitUpdate(){
				//校验新密码是否一一致
				if(this.newPasswd1 != this.newPasswd2){
					this.errMsg = '新密码前后输入不一致';
					this.errFlag = true;
					return;
				}
				if(this.oldPasswd ==''){
					this.errMsg = '请输入旧密码';
					this.errFlag = true;
					return;
				}
				if(this.newPasswd1 == '' || this.newPasswd1 == ''){
					this.errMsg = '请输入新密码';
					this.errFlag = true;
					return;
				}
				uni.showLoading();
				this.$http.request({
					url:this.$url.updateUserPwd,
					data:{
						oldPwd:md5(this.oldPasswd),
						newPwd:md5(this.newPasswd1),
						confirmPwd:md5(this.newPasswd2)
					}
				}).then(res =>{
					uni.hideLoading();
					if(res.errcode == 1){
						uni.showToast({	
							title:'密码修改成功',
							success() {
								let userInfo = uni.getStorageSync('userInfo');
								userInfo.token = res.data.token;
								uni.setStorageSync('userInfo',userInfo);
								setTimeout(()=>{
									uni.navigateBack();
								},1500);
							}
						})
						
					} else{
						this.errMsg = res.message;
						this.errFlag = true;
					}
				})
				
			}
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
	page{
		background: #f3f3f3;
	}	
	
	.input-item{
		width: 750rpx;
		padding: 25rpx;
		margin-top: 20rpx;
		text{
			font-weight: bold;
		}
		input{
			background: #FFFFFF;
			margin-top: 8rpx;
			height: 65rpx;
			line-height: 65rpx;
			padding-left: 25rpx;
		}
	}
	
	.bbl{
		border-left: 4px solid $myBlue;
		padding-left: 10rpx;
	}
	
	.phstyle{
		line-height: 65rpx;
	}
	
	
	.btn_blue {
		background: $myBlue;
		line-height: 80rpx;
		margin-top: 200rpx;
		width: 710rpx;
		color: #FFFFFF;
	}
	
	.errmsg{
		height: 57rpx;
		font-size: 27rpx;
		font-family: Adobe Heiti Std R, Adobe Heiti Std R-R;
		text-align: left;
		color: #e60012;
		line-height: 40rpx;
		padding: 25rpx;
	}
</style>
