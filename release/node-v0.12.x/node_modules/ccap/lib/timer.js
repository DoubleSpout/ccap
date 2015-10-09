/*
验证码定时生成器
*/

var timer = {
	timeout:1000*60,//更新验证码时间1分钟
	reg_ary:[],
	isRunning:0,
}

timer.getIsRunning = function(){
	return timer.isRunning
}

timer.timer = function(notFirst){

		
		if(!notFirst && timer.isRunning > 0){
			console.error('more then one ccap timer, will stop it!')
			return
		}
		
		var rary = timer.reg_ary,
			len = rary.length;

		for(var i=0;i<len;i++){
			try{
				rary[i]._timer();
			}
			catch(e){
				console.error(e)
			}
		}

		timer._timeout = setTimeout(function(){
			timer.timer(1);
		}, timer.timeout)

		timer.isRunning = 1
		
}

//清除定时器
timer.clearTimeout = function(){

	try{
		clearTimeout(timer._timeout)
		timer.isRunning = 0
	}
	catch(e){
		return false
	}
	return true
}


module.exports = timer;