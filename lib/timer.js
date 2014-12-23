/*
验证码定时生成器
*/

var timer = {
	timeout:1000*60,//更新验证码时间1分钟
	reg_ary:[],
}


timer.timer = function(){
		var rary = timer.reg_ary,
			len = rary.length;

		for(var i=0;i<len;i++){
			rary[i]._timer();
		}

		setTimeout(function(){
			timer.timer();
		}, timer.timeout)
}


module.exports = timer;