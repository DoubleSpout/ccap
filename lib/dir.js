var fs = require('fs');
var p = require('path');
var node_schedule = require('node-schedule');
var path = p.join(__dirname,'../','/cap_img');
var pid = process.pid;
var obj ={}

//定义定时器
obj.setSchedule = function(){
	//定义规则
	var rule = new node_schedule.RecurrenceRule();
	rule.dayOfWeek = [new node_schedule.Range(0, 6)];
	rule.hour = 2;
	rule.minute = 0;
	var j = node_schedule.scheduleJob(rule, function(){
			//执行定时计划
			//console.log('start delete')
		   obj.dir(1)
	});
	//马上执行一次
	//obj.scheduleJob()
}


obj.dir = function(isTiming){
	try{
		fs.chmodSync(path, '777');//修改访问文件夹权限
	}
	catch(e){
		console.log(e);
	}


	var fileArray = fs.readdirSync(path);//获取所有文件名
	var now = Date.now()
	fileArray.forEach(function(v,i){ //清空文件夹
		try {
			if(isTiming){
				var nameList = v.split('_')
				if(nameList[2] == pid && (now - nameList[3]>=60*1000*2)){
					fs.unlinkSync(p.join(path,v));
				}
			}
			else{
				fs.unlinkSync(p.join(path,v));
			}		
		} catch(e) {
			console.log(e);
		}
	})
}

//check if exist dir
obj.createDir = function(){
	if(!fs.existsSync(path)){
		try{
			fs.mkdirSync(path)
		}
		catch(e){
			console.log(e)
		}
		
	}
}()

module.exports = obj;
