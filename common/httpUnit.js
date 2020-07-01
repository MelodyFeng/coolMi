let baseURL='https://dev.coolmitech.com:10009/ST_Track_Manage';


function httpUnit (options){
	let userInfo = uni.getStorageSync('userInfo');
	return new Promise((resolve,reject) =>{
		uni.request({
			method: options.method || 'POST',
			url: baseURL + options.url,
			data: options.data || {},
			timeout: options.timeout || 30000,
			dataType: options.dataType || 'json',
			responseType: options.responseType || 'text',
			header:userInfo?{token:userInfo.token}:{},
			success(data) {
				if(data.data.errcode == 400 || data.data.errcode == 402){
					uni.removeStorageSync('userInfo');
					uni.redirectTo({
						url:"/pages/login/login?errcode="+data.data.errcode,
						success(res){
		
						},
						fail(err) {
							uni.showToast({
								title:'请求失败',
								icon:'none'
							})
						}
					})
				} else{
					resolve(data.data);
				}
			},
			fail(data) {
				uni.showToast({
					title:'请求失败'
				})
				reject(data);
			}
		})
	}) 
}
export default {request:httpUnit,baseURL:baseURL}
