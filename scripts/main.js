/**
 * Created by zhuyimin on 2015/1/27.
 */
angular.module('app',[])
	.controller('gridContainer',function(){
		var i = 0,data = [];
		//一共有多少格
		this.size = 16;

		//生成 this.size / 2 个不重复的数字


		//把数字随机填到 grid 中，每个填两次

		while(i < this.size){
			 data.push({
				 value :
			 })
		}
		this.gridData = [
			[{value: 1},{value: 2},{value: 3}],
			[{value: 4},{value: 5},{value: 6}],
			[{value: 7},{value: 8},{value: 9}]
		];
		this.showClickNum = function(value){
			console.log(value);
		}
	});