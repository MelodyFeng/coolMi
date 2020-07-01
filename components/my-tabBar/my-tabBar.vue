<template>  
    <view class="tabbar-container">  
        <block>  
            <view class="tabbar-item" :key="index" v-for="(item,index) in tabbarList" :class="[item.centerItem ? ' center-item' : '']" @click="changeItem(item)">  
				<view class="item-top">
					<image :src="currentItem==item.id?item.selectIcon:item.icon"></image>  
				</view>  
				<view class="item-bottom" :class="[currentItem==item.id ? 'item-active' : '']">  
					<text>{{item.text}}</text>  
				</view>  
			</view>  
        </block>  
    </view>  
</template> 

<script>
	export default {  
	        props:{  
	            currentPage: {  
	                type: Number,  
	                default: 0  
	            }  
	        },  
	        data() {  
	            return {  
	                currentItem: 0,  
	                tabbarList: [  
	                    {  
	                        id: 0,  
	                        path: "/pages/index/index",  
	                        icon: "/static/img/work.png",  
	                        selectIcon: "/static/img/work_select.png",  
	                        text: "工作台",  
	                        centerItem: false  
	                    },{  
	                        id: 1,  
	                        path: "/pages/editInfo/editInfo",  
	                        icon: "/static/img/edit.png",  
	                        selectIcon: "/static/img/edit.png",  
	                        text: "",  
	                        centerItem: true  
	                    },{  
	                        id: 2,  
	                        path: "/pages/userInfo/userInfo",  
	                        icon: "/static/img/person.png",  
	                        selectIcon: "/static/img/person_select.png",  
	                        text: "我的",  
	                        centerItem: false  
	                    }
	                ]  
	
	            };  
	        },
	        mounted(){  
	            this.currentItem = this.currentPage; 
	        },  
	        methods: {  
	            changeItem(item){  
	                uni.switchTab({  
	                    url: item.path  
	                });  
	            }  
	        }  
	    }  
</script>

<style>
		view{  
			   padding: 0;  
			   margin: 0;  
			   box-sizing: border-box;  
		}  
	    .tabbar-container{  
	        position: fixed;  
	        bottom: 0;  
	        left: 0;  
	        width: 100%;  
	        height: 110rpx;  
	        box-shadow: 0 0 5px #999;  
	        display: flex;  
	        align-items: center;  
	        padding: 5rpx 0;  
	        color: #999999; 
			background-color: #ffffff;  
	    }  
	    .tabbar-container .tabbar-item{  
	        width: 33.3%;  
	        height: 100rpx;  
	        display: flex;  
	        flex-direction: column;  
	        justify-content: center;  
	        align-items: center;  
	        text-align: center;  
	    }  
	    .tabbar-container .item-active{  
	        color: #267cfb;  
	    }  
	    .tabbar-container .center-item{  
	        display: block;  
	        position: relative;   
	    }  
	    .tabbar-container .tabbar-item .item-top{  
	        width: 70rpx;  
	        height: 70rpx;  
	        padding: 10rpx;  
	    }  
	    .tabbar-container .center-item .item-top{  
	        flex-shrink: 0;  
	        width: 120rpx;  
	        height: 120rpx;  
	        position: absolute;  
	        top: -50rpx;  
	        left: calc(50% - 50rpx);  
	        border-radius: 50%;   
			border-top: 1px solid #D2D2D2;
	        background-color: #ffffff;
	    }
	    .tabbar-container .tabbar-item .item-top image{  
			width: 90%;
			height: 100%;
	    }
		  .tabbar-container .center-item .item-top image{
		  	width: 100%;
		  	height: 100%;
		  }  
	    .tabbar-container .tabbar-item .item-bottom{  
	        font-size: 28rpx;
	        width: 100%;
	    }
		  .tabbar-container .tabbar-item .item-bottom text{
			font-size: 22rpx;
			font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
			position: relative;
			top: -5px;
		  }  
	    .tabbar-container .center-item .item-bottom{  
	        position: absolute;  
	        bottom: 5rpx;  
	    }  
</style>
