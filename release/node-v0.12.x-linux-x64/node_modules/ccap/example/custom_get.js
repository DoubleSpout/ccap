var ccap = require('../');
var i=0;

var captcha = ccap({
	width:128,
	height:40,
	offset:35,
	quality:100,
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha.get();

console.log(ary[0])
console.log(ary[1])





var captcha2 = ccap({
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha2.get();

console.log(ary[0])
console.log(ary[1])



var captcha3 = ccap({
	width:128,
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha3.get();

console.log(ary[0])
console.log(ary[1])


var captcha4 = ccap({
	offset:30,
	quality:10,
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha4.get();

console.log(ary[0])
console.log(ary[1])



var captcha5 = ccap({
	offset:30,
	width:300,
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha5.get();

console.log(ary[0])
console.log(ary[1])




