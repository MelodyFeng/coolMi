<template>
	<view class="container" v-if="visible" :style="{top:defaultTop}" @click.self="close">
		<view :style="{height:showTime?'300rpx':'0'}" class="time-content">
			<view class="time-picker">
				<view class="time-title">
					开始时间:
				</view>
				<view>
					<picker mode="multiSelector" :value="startIndex" class="" @change="bindStartChange" :range="timeRange">{{startTime}}</picker>
				</view>
			</view>
			<view class="time-picker">
				<view class="time-title">
					结束时间:
				</view>
				<view>
					<picker mode="multiSelector" :value="endIndex" class="" @change="bindEndChange" :range="timeRange">{{endTime}}</picker>
				</view>
			</view>
			<view class="time-btn">
				<view style="border-top: 1px solid #d2d2d2;" @click="resetTime">
					<text>重 置</text>
				</view>
				<view style="background: #267cfb;color: #FFFFFF;" @click="confirmTime">
					<text>确 定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			top:{
				type: String,
				default: ''
			}
		},
		data(){
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate();
			const hours = []
			const hour = date.getHours();
			const minutes = []
			const minute = date.getMinutes();
			for (let i = 2010; i <= year+10; i++) {
				years.push(i+"年")
			}
			for (let i = 1; i <= 12; i++) {
				months.push((i<10?"0"+i:i)+"月")
			}
			for (let i = 1; i <= 31; i++) {
				days.push((i<10?"0"+i:i)+"日")
			}
			for (let i = 0; i < 24; i++) {
				hours.push(i<10?"0"+i:i)
			}
			for (let i = 0; i < 60; i++) {
				minutes.push(i<10?"0"+i:i)
			}
			const defaultStartIndex = [years.indexOf(year+"年"),months.indexOf((month<10?"0"+month:month)+"月"),days.indexOf((day<10?"0"+day:day)+"日"),0,0];
			const defaultEndIndex = [years.indexOf(year+"年"),months.indexOf((month<10?"0"+month:month)+"月"),days.indexOf((day<10?"0"+day:day)+"日"),23,59];
			return{
				reg:/[\u4e00-\u9fa5]/g,
				defaultStartIndex,
				defaultEndIndex,
				visible: false,
				showTime: false,
				defaultTop:0,
				timeRange:[years,months,days,hours,minutes],
				startIndex:defaultStartIndex,
				endIndex:defaultEndIndex
			}
		},
		computed:{
			startTime(){
				return (this.timeRange[0][this.startIndex[0]] +'-'+ this.timeRange[1][this.startIndex[1]] +'-'+ this.timeRange[2][this.startIndex[2]] +
				 " "+this.timeRange[3][this.startIndex[3]] +":"+ this.timeRange[4][this.startIndex[4]]).replace(this.reg,'');
			},
			endTime(){
				return (this.timeRange[0][this.endIndex[0]] +'-'+ this.timeRange[1][this.endIndex[1]] +'-'+ this.timeRange[2][this.endIndex[2]] +
				 " "+this.timeRange[3][this.endIndex[3]] +":"+ this.timeRange[4][this.endIndex[4]]).replace(this.reg,'');
			}
		},
		methods:{
			close() {
				this.showTime = false
				this.visible = false;
				this.$emit('closeDrawer');
			},
			open() {
				this.visible = true;
				this.showTime = true
			},
			bindStartChange(e){
				let oldStartIndex = this.startIndex;
				this.startIndex = e.target.value;
				if(this.compareDate(this.startTime,this.endTime)){
					uni.showToast({
						icon:'none',
						title:'开始时间不能大于结束时间'
					})
					this.startIndex = oldStartIndex;
				}
			},
			bindEndChange(e){
				let oldEndIndex = this.endIndex;
				this.endIndex = e.target.value;
				if(this.compareDate(this.startTime,this.endTime)){
					uni.showToast({
						icon:'none',
						title:'开始时间不能大于结束时间'
					})
					this.endIndex = oldEndIndex;
				}
			},
			resetTime(){
				this.startIndex = this.defaultStartIndex;
				this.endIndex = this.defaultEndIndex;				
			},
			confirmTime(){
				this.$emit('setSearchParam',{
					analyzeStartDate: this.startTime,//分析开始时间
					analyzeEndDate: this.endTime//分析结束时间
				});
			},
			compareDate(date1,date2){
				var oDate1 = new Date(date1);
				var oDate2 = new Date(date2);
				if(oDate1.getTime() > oDate2.getTime()){
					return true; 
				} else {
					return false;
				}
			},
		},
		// 加载
		created() {
			this.defaultTop = this.top;
		}
	}
</script>

<style lang="scss">
	.container{		
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 999;
		background: #FFFFFF;
		background-color: rgba(0, 0, 0, 0.4);

		}
	.time-content{
		height: 0rpx;
		transition: height 0.3s;
		background-color: #FFFFFF;
		position: relative;
		overflow: hidden; 
	}
	.time-picker{
		height: 100rpx;
		display: flex;
		width: 100%;
		padding-top: 40rpx;
		.time-title{
			width: 25%;
			text-align: center;
		}
		picker{
			border: 1px solid #D2D2D2;
			height: 45rpx;
			padding: 0rpx 20rpx;
			border-radius: 5px;
			width: 350rpx;
		}
	}
	.time-btn{
		display: flex;
		position: absolute;
		bottom: 0rpx;
		height: 60rpx;
		width: 100%;
		text-align: center;
		view{
			flex: 1;
			line-height: 60rpx;
		}
	}
</style>

