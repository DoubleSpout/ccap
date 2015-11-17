var http = require('http');

//Instantiated ccap class

var ccap = require('../')({
	width:200,
	height:50,
	offset:30,
	quality:100,
  fontsize:40
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