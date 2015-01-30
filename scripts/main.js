/**
 * Created by zhuyimin on 2015/1/27.
 */
angular.module('app',[])
	.controller('gridContainer',['$scope','genData',function($scope,genData){

		//一共有多少格
		this.size = 16;
		this.rows = 4;
		this.cols = 4;

		this.genCols = function(index){
			var cols = this.cols,i = 0,arr = [];
			while(i < cols){
				arr.push(index+i);
				i++;
			}
			return arr;
		};

		this.checkClickNum = function(item){


			// status: 0-已完成配对 1-显示 2-隐藏
			//检查被点击对象的 status 属性
			//如果 status 为 0或1，不作业务处理
			//如果 status 为 2
			// 先检查正在显示的对象的数目
				//如果对象数目为 0:
					//则把被点击对象的 status 置为 1，并使显示计数器加1
				//如果对象数目为 1:
					//检查二者的value是否相等
						//如果相等，则把二者的 status 置为 0，并使完成计数器加2，使显示计数器为0
						//如果不相等，则把被点击对象的 status 置为 1，并使显示计数器加1
				//如果对象数目为 2:
					//则把这两个数目的对象 status 置为 2，把被点击对象 status 置为 1

			//如果完成计数器等于对象数量，则完成测试

			if(item.status !== 2){
				return false;
			}
			if(this.itemShowNum === 0){
				item.status = 1;
				this.itemsInShow.push(item);
				this.itemShowNum = this.itemShowNum + 1;
			}
			else if(this.itemShowNum === 1){
				if(item.value === this.itemsInShow[0].value){
					item.status = 0;
					this.itemsInShow[0].status = 0;
					this.itemComplete = this.itemComplete + 2;
					this.itemShowNum = 0;
					this.itemsInShow.pop();
				}
				else {
					item.status = 1;
					this.itemShowNum = this.itemShowNum + 1;
					this.itemsInShow.push(item);
				}
			}
			else {
				this.itemsInShow.forEach(function(item){
					item.status = 2;
				});
				this.itemShowNum = 1;
				item.status = 1;
				this.itemsInShow = [];
				this.itemsInShow.push(item);
			}

			if(this.itemComplete === this.size){
				setTimeout(function(){
					alert('cong!!!');
				},14);
			}

		};

		this.itemIsComplete = function(item){
			return item.status === 0;
		};
		this.show = function(status){
			return status !== 2;
		};

		this.initData = function(){
			this.itemShowNum = 0;
			this.itemComplete = 0;
			this.itemsInShow = [];
			this.gridData = genData(this.size / 2);
		};

		this.playAgain = function(){
			this.initData();
		};
		this.initData();
	}]).
	factory('genData', function(){
		return function(size){
			var
				j = 0,
				k = 0,
				index = 0,
				sourceLen = 100,
				numbers = [],
				gridData = [];
			//先生成列表 [0-sourceLen)
			var source = [];
			while(j < sourceLen){
				source.push(j);
				j++;
			}
			//再从中挑 size 个不重复的数字
			//
			for(; k < size; k++){
				index = Math.floor(Math.random() * sourceLen);
				numbers.push(source[index]);
				source[index] = source[sourceLen-1];
				sourceLen--;
			}

			//double 这个数组
			var doubleNumbers = numbers.concat(numbers);

			var dataLen =  doubleNumbers.length;

			//把这个数组的元素放进gridData的随机位置
			for(k = 0;k < size * 2;k++){
				index = Math.floor(Math.random() * dataLen);
				gridData.push({
					status: 2,
					value: doubleNumbers[index]
				});
				doubleNumbers[index] = doubleNumbers[dataLen-1];
				dataLen--;
			}
			return gridData;
		}
	});