const url = {
	//获取logo地址和平台名
	getLogo:'/wx/sys/getLogo.exjson',
	//登录地址
	logIn:'/wx/auth/login.exjson',	
	//登出
	logOut:'/wx/auth/logout.exjson',	
	//获取当前用户安全检查量化完成情况
	getUserRationReport:'/wx/writeReal/getUserRationReport.exjson',	
	//获取当前用户最近5条记录
	getTopWriteReals:'/wx/writeReal/getTopWriteReals.exjson',
	//判断token有效期
	checkLogin:'/wx/auth/checkLogin.exjson',
	//修改密码
	updateUserPwd:'/wx/auth/updateUserPwd.exjson',
	//获取车间列表
	getDepartList:'/wx/sys/getDepartList.exjson',
	//获取所有问题类别
	getProblemTypes:'/wx/writeProblem/getProblemTypes.exjson',
	//查询写实管理分页列表页面
	getWriteRealList:'/wx/writeReal/getWriteRealList.exjson'
}

export default url