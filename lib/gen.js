
//定义随机数组

var gen_fuc = function({str_ary, str_num}){
	 var r_num = str_ary.length,
		text = '';
	for(var i=0;i<str_num;i++){
		var pos = Math.floor(Math.random()*r_num)
		text += str_ary[pos];//生成随机数
	}
	return text;
}

module.exports = gen_fuc;


