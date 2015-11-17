var path = require('path');
var fs = require('fs');
var os = require('os');
var hrobj = require('../build/Release/hcaptha.node');
var dirObj = require('./dir.js');
var timer = require('./timer.js');
var gen_func = require('./gen.js');

//ccap.create("abcdef","/usr/local/nodejs/hcaptha/test.jpeg",6,256,40,40,50);


/*
CAP类支持3种实例化
1、CAP(),完全使用默认
2、CAP(width,height,offset)
3、CAP({
	width:256,
	height:40,
	offset:40,
	generate:function(){//自定义生成随机数
		this.width;
		this.height;
		return "abcdefg";
	}
})
*/



var ins_count = 0;//记录实例化次数
var img_path = path.join(__dirname,'../','/cap_img');
var pid = process.pid;


	
var isjpeg = (os.platform() == 'linux')? 1 : 0;//判断是否启用jpeg,如果是为win32则只能使用bmp

var fname = isjpeg ? '.jpeg':'.bmp'


var CAP = function(args){
	if(!(this instanceof arguments.callee)) return new arguments.callee(args);
	this.filename = img_path+'/captcha_'+ins_count+'_'+pid+'_'+Date.now()+'_{$number}'+fname;
	this.width = 256;//默认验证码宽度
	this.height = 60;//默认验证码高度
	this.offset = 40;//默认验证码字符间隔
	this.quality = 50;//默认图片质量

	this._text_len = 6;//默认验证码字数
	this.generate = null;//自定义生成随机字符串方法
	this.fontsize = 57; //默认字体大小

	this.is_first = true;

	this._cache_num = 20;//默认缓存5个验证码
	this.buf = [];//缓存数组
	this.text_buf = [];//定义字符串内容数组

	this._init(args);//构造函数

	this._create = this.generate ? this._custom_create : this._default_create;

	this._create();
	
	this.is_first = false;

	this.setTimeout = timer.timer
	this.clearTimeout = timer.clearTimeout
	this.timerIsRunning = timer.getIsRunning

}
CAP.prototype._init = function(args){
	if(arguments.length<1) return;//如果不传参数，则全部使用默认值

	if(typeof arguments[0] === 'object'){//如果传递了对象，则替换默认值
		var obj = arguments[0];
		this.width = obj.width || this.width;
		this.height = obj.height || this.height;
		this.offset = obj.offset || this.offset;
	    this.quality = obj.quality || this.quality;
		this.generate = obj.generate || null;
		this.fontsize = obj.fontsize || this.fontsize;
		return;
	}
	//如果只传递了宽，高，间隔则替换默认值
	this.width = arguments[0] || this.width;
	this.height = arguments[1] || this.height;
	this.offset = arguments[2] || this.offset;
	
	this._get_count = 0;
	return this;
}

CAP.prototype._default_generate = gen_func; //设置默认验证码生成函数



CAP.prototype._call_create = function(text,len,j){//调用C++的CIMG库的create函数生成验证码文件
	var that = this;
	var filepath = that.filename.replace('{$number}',j);
	hrobj.create(text, filepath, len, that.width, that.height, that.offset, that.quality,isjpeg,that.fontsize);

	//if(this.is_first){
	try{
		var buffer = fs.readFileSync(filepath);
	}catch(e){
		console.log('readsync file error');
	}
	that.buf[j] = buffer;
	that.text_buf[j] = text;
	return this;
	//}

	// fs.readFile(filepath, function(err,data){
	// 			if(err) return console.log('read file error');
	// 			that.buf[j] = data;
	// 			that.text_buf[j] = text;
	// });
	// return this;
}

CAP.prototype._default_create = function(){//默认方式创建
	
	for(var i=0;i<this._cache_num;i++){			
		this._call_create(this._default_generate(), this._text_len, i)
	}

	return this;
}

CAP.prototype._custom_create = function(){//自定义创建
	
	for(var i=0;i<this._cache_num;i++){	
		var str = this.generate();
		this._call_create(str, str.length,i);
	}

	return this;
}

CAP.prototype._timer = function(){//存入计数器的函数	
	
	this._get_count++;//记录timer调用次数

	this._create();
}


CAP.prototype.get = function(){//对外接口，返回验证码和字母

	var num = Math.floor(Math.random()*this._cache_num);//生成随机数

	return [this.text_buf[num], this.buf[num]];//返回字母和buffer给用户

}

module.exports = function(args){
	var cap = CAP(args);
	ins_count++;
	timer.reg_ary.push(cap);//将实例化之后的对象注册到timer定时器中
	return cap;
};



dirObj.dir();//设置路径权限，清空历史文件夹
dirObj.setSchedule();//开启定时器，每天凌晨2点清理文件夹
timer.timer();//启动计时器，每分钟更新缓存