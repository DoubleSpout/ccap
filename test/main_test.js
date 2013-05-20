var ccap = require('../');
var assert = require('assert');
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


assert.equal(/^a[0-9]*$/.test(ary[0]),true)
assert.equal(Buffer.isBuffer(ary[1]), true)




var captcha2 = ccap({
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha2.get();

assert.equal(/^a[0-9]*$/.test(ary[0]),true)
assert.equal(Buffer.isBuffer(ary[1]), true)



var captcha3 = ccap({
	width:128,
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha3.get();

assert.equal(/^a[0-9]*$/.test(ary[0]),true)
assert.equal(Buffer.isBuffer(ary[1]), true)


var captcha4 = ccap({
	offset:30,
	quality:10,
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha4.get();

assert.equal(/^a[0-9]*$/.test(ary[0]),true)
assert.equal(Buffer.isBuffer(ary[1]), true)



var captcha5 = ccap({
	offset:30,
	width:300,
	generate:function(){
		return "a"+(i++);
	}
});
var ary = captcha5.get();

assert.equal(/^a[0-9]*$/.test(ary[0]),true)
assert.equal(Buffer.isBuffer(ary[1]), true)



var captcha6 = ccap(128,40,35);
var ary = captcha6.get();

assert.equal(/\w/.test(ary[0]),true)
assert.equal(Buffer.isBuffer(ary[1]), true)




var captcha7 = ccap(128,40);
var ary = captcha7.get();

assert.equal(/\w/.test(ary[0]),true)
assert.equal(Buffer.isBuffer(ary[1]), true)


var captcha8 = ccap(128);
var ary = captcha8.get();

assert.equal(/\w/.test(ary[0]),true)
assert.equal(Buffer.isBuffer(ary[1]), true)

console.log('ccap all test done!')

process.exit(0)


