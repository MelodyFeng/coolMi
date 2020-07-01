<template>
	<view class="container">
		<!-- 一级 -->
		<scroll-view class="lv-one" scroll-y="true">
			<ul>
				<li :class="{checked:checkedDId == -1 }" @click="checkDepart(-1,-1)">
					<text>全部</text>
				</li>
				<li 
				v-for="(item,index) in departs" 
				:class="{checked:checkedDId == item.departId}" 
				:style="{'line-height':item.departName.length < 9?'80rpx':'35rpx'}" 
				:key="item.departId"
				@click="checkDepart(item.departId,index)"
				>
					<text>{{item.departName}}</text>
				</li>
			</ul>
		</scroll-view>
		<!-- 二级 -->
		<scroll-view class="lv-two" scroll-y="true">
			<ul>
				<li @click="checkWorkArea(-1,-1)" :class="{checked:checkedWId == -1 }">
					<text>全部</text>
				</li>
				<li 
				v-for="(item,index) in workarea" 
				:key="item.departId" 
				:class="{checked:checkedWId == item.departId}"
				@click="checkWorkArea(item.departId,index)"
				>
					<text>
						{{item.departName}}
					</text>
				</li>
			</ul>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				departs:[],
				workarea:[],
				checkedDId:-1,
				checkedWId:-1
			}
		},
		methods:{
			checkDepart(id,index){
				if(index === -1){
					this.workarea = [];
				} else{	
					this.workarea = this.departs[index].children;
				}
				this.checkedDId = id;
				this.checkedWId = -1;
			},
			checkWorkArea(id,index){
				this.checkedWId = id;
			},
		},
		// 加载
		created() {
			//获取组织架构
			this.$http.request({
				url:this.$url.getDepartList
			}).then(res => {
				if(res.errcode == 1){
					this.departs = res.data.departs
				} else {
					uni.showToast({
						icon:'none',
						title:'获取工区信息失败'
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	.container{
		font-size: 23rpx;
		font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
		font-weight: 400;
		text-align: center;
		height: 100%;
		display: flex;
	}
	
	.lv-one{
		height: 100%;
		background-color: #f2f2f2;
		flex: 1;
		ul li {
			height: 80rpx;
			line-height: 80rpx;
			padding: 0rpx 10rpx;
			text{
			}
		}
	}
	
	.lv-two{
		height: 100%;
		background-color: #FFFFFF;
		flex: 2;
		ul{
			li {
				height: 80rpx;
				line-height: 80rpx;
				padding: 0rpx 40rpx;
				text-align: left;
			}
		} 
		

	}
	
	.checked{
		background-color: #FFFFFF !important;
		color: $myBlue;
	}
</style>
