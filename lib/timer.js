/*
验证码定时生成器器
*/

var timer = {
	timeout:1000*60,//更新验证码时间1分钟
	reg_ary:[],
	timer:function(){
		var rary = this.reg_ary,
			len = rary.length;
		for(var i=0;i<len;i++){
			rary[i]._timer();
		}
		this.loop();
	},
	loop:function(){
		var that = this;
		setTimeout(function(){
			that.timer();
		},that.timeout)
	}
}

//timer.loop();


module.exports = timer;
