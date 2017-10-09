
//定义随机数组

var gen_fuc = function(options){
	 var r_num = options.str_ary.length,
		text = '';
	for(var i=0;i<options.str_num;i++){
		var pos = Math.floor(Math.random()*r_num)
		text += options.str_ary[pos];//生成随机数
	}
	return text;
}

module.exports = gen_fuc;


