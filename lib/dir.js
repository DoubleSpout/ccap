
var fs = require('fs');
var p = require('path');
var path = p.join(__dirname,'../','/cap_img');
var dir = function(){
	fs.chmodSync(path, '777');//修改访问文件夹权限

	var fileArray = fs.readdirSync(path);//获取所有文件名

	fileArray.forEach(function(v,i){ //清空文件夹
		fs.unlinkSync(p.join(path,v));
	})

}
module.exports = dir;