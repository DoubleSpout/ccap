var http = require('http');

//Instantiated ccap class

var ccap = require('../')({
	width:200,
	height:50,
	offset:30,
	quality:100,
  fontsize:40,
  text_len: 4, // 长度
  str_ary: ['1','2','3','4','5','6','7','9','A','C','D','E','F','G','H',
	'I','J','K','L','M','N','R','S','T','U','W','X','Y','Z'], // 自定义字符组，去掉一些容易搞错的字符如0 O 8 B等
});

http.createServer(function (request, response) {

  if(request.url == '/favicon.ico')return response.end('');//request favicon.ico

  var ary = ccap.get();
  var txt = ary[0];
  var buf = ary[1];

  response.end(buf);
  console.log(txt);
  
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');