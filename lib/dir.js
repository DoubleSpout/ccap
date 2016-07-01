var fs = require('fs');
var p = require('path');
var async =require('async');
var node_schedule = require('node-schedule');
var cluster = require('cluster');

var path = p.join(__dirname, '..', 'cap_img');
var pathCluster =  cluster.isWorker ? cluster.worker.id : '0';

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


	fs.chmod(path, '777', function(err){
		if(err){
			console.error(err);
			return
		}

		fs.readdir(path, function(err, fileArray){
			if(err){
				console.error(err);
				return
			}
			var now = Date.now()
			fileArray.forEach(function(v,i){ //清空文件夹
				try {
					if(isTiming){
						var nameList = v.split('_')
						if(nameList[2] == pid && (now - nameList[3]>=60*1000*2)){
							fs.unlink(p.join(path,v), function(e){ console.error(e); });
						}
					}
					else{
						fs.unlink(p.join(path,v), function(e){ console.error(e); });
					}		
				} catch(e) {
					console.log(e);
				}
			})

		})

		
		

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

	var path2 = p.join(path, pathCluster)
	console.log("##################", path2)
	if(!fs.existsSync(path2)){
		try{
			fs.mkdirSync(path2)			
		}
		catch(e){
			console.log(e)
		}
	}

}()

module.exports = obj;
