var ccap = require('../')();


var nows = Date.now();
var count = 0;
var interval = 1000*60*2;

while(Date.now() - nows < interval){
	var array = ccap.get();
	count++;
	
}
var ends = Date.now();
console.log('Generate captcha speed is : '+Math.floor(count/(ends - nows))+'/sec')