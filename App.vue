<script>
export default {
	onLaunch: function() {
		uni.hideTabBar();
		const userInfo = uni.getStorageSync('userInfo');
		if(userInfo){
			//判断token是否过期
			this.$http.request({
					url: this.$url.checkLogin,
					header:{token:userInfo.token}
				}).then(res =>{
					console.log(res);
					if(res.success){
						uni.switchTab({
							url:'/pages/index/index',
							success(res) {
								console.log(res);
							},
							fail(err) {
								console.log(err);
							}
						})
					}
				});	
		}
	},
	onShow: function() {

	},
	onHide: function() {

	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
view,input{
	box-sizing: border-box;
}

li{
	list-style: none;
}

</style>
