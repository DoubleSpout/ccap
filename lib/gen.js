var str_ary = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//定义随机数组

var gen_fuc = function(num){
	var str_num = num || 6,
		r_num = str_ary.length,
		text = '';
	for(var i=0;i<str_num;i++){
		var pos = Math.floor(Math.random()*r_num)
		text += str_ary[pos];//生成随机数
	}
	return text;
}

module.exports = gen_fuc;


