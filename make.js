
var path = require('path');
var os = require('os');
var spawn = require('child_process').spawn;
var fs = require('fs');
var lJpegPath = path.join(__dirname, 'addon');


console.log("I'm glad you to select ccap, enjoy it!")

if(os.platform() == 'win32'){
    return false;
}
var tar = function(){//tar包

	var tar = spawn('tar',['-xvf',lJpegPath+'/jpegsrc.v8d.tar.gz'],{cwd:lJpegPath});
		console.log('tar libjpeg ...');
		
		tar.stdout.on('data', function (data) {
		 
		});


		tar.stderr.on('data', function (data) {
		  console.log('stderr: tar error: ' + data);
		  process.exit();
		});

		tar.on('exit', function (code, signal) {
				conf();		  
		});

}


var conf = function(){

	var conf = spawn(lJpegPath+'/jpeg-8d/configure', [], {cwd:lJpegPath+'/jpeg-8d'});
	 console.log('libjpeg configure ...');
		conf.stdout.on('data', function (data) {
		 
		});


		conf.stderr.on('data', function (data) {
		  console.log('stderr:configure: '+data);
			process.exit();
		});

		conf.on('exit', function (code, signal) {
				make();		  
		});

}




var make = function(cb){

		var make = spawn('make',[], {cwd:lJpegPath+'/jpeg-8d'});
		console.log('libjpeg make ...');
		make.stdout.on('data', function (data) {
			
		});


		make.stderr.on('data', function (data) {
		  console.log('stderr: make error: '+data);
		  process.exit();
		});


		make.on('exit', function (code, signal) {
				makei();
		  
		});

}


var makei = function(){
	var makei = spawn('make',['install'], {cwd:lJpegPath+'/jpeg-8d'});
	    console.log('libjpeg make install...');
		makei.stdout.on('data', function (data) {
			   
		});


		makei.stderr.on('data', function (data) {
			   console.log('stderr: make install error: '+data);
				process.exit();
		});


		makei.on('exit', function (code, signal) {
				echo();
		});
}


var echo = function(){
		fs.appendFile('/etc/ld.so.conf', '\n/usr/local/lib', 'utf-8', function (err) {
				  if (err){
					  console.log('stderr: echo so lib error: '+data);
					  process.exit();
				  }			  
				  var ldconfig = spawn('ldconfig');				 
				    ldconfig.on('exit', function (code, signal) {
						    console.log('echo  /etc/ld.so.conf and reload it!');
					        console.log('#########  libjpeg make complete!  ###########')
					        process.exit();
				    })
			});


}


tar();

