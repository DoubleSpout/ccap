var ccap = require('../');

var captcha2 = ccap(128,40,35);
var ary2 = captcha2.get();

console.log(ary2[0])
console.log(ary2[1])



var captcha3 = ccap(128,40);
var ary3 = captcha3.get();

console.log(ary3[0])
console.log(ary3[1])


var captcha4 = ccap(128);
var ary4 = captcha4.get();

console.log(ary4[0])
console.log(ary4[1])