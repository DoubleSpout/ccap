## Node-ccap [![Build Status](https://travis-ci.org/DoubleSpout/ccap.png?branch=master)](https://travis-ci.org/DoubleSpout/ccap)

Node.js generate captcha using c++ library CImg. 

You can generate captcha without install any other libraries or software, only do npm install ccap, that's all.

`node-ccap` support Linux, Windows and Mac.

compile maybe cost you 1 minute, simply wait.

Linux support jpeg, Windows and Mac only support bmp!

**Please never using ccap in production on Windows and Mac, only with Linux.**

### Performance

Generate captcha picture `1204/Sec` (BMP unzip)

### Install

```bash
$ npm install ccap
```

### Getting Started

these three ways all will be ok:

#### Basic Useage:

```js
var captcha = ccap();
```

#### Advanced Useage:

There are two ways to config a captcha instance:
  
```js
var captcha = ccap(width, height, offset);
```

And:

```js
var captcha = ccap({
  // Set width,default is 256
  width:256,

  // Set height,default is 60
  height:60,

  // Set text spacing,default is 40
  offset:40,

  // Set picture quality,default is 50
  quality:100,

  // set font size,default is 57
  fontsize:57,

  // Custom the function to generate captcha text
  // Generate captcha text here:
  generate:function(){
    // Return the captcha text
    return text;
  }
});
``` 

### API
   
```js
var captcha = ccap();
// ary[0] is captcha's text,ary[1] is captcha picture buffer.
var ary = captcha.get();
var text = ary[0];
var buffer = ary[1];
```

### Examples

```js
var http = require('http');
var ccap = require('ccap')(); // Instantiated ccap class 

http.createServer(function (request, response) {
  if(request.url == '/favicon.ico')return response.end('');//Intercept request favicon.ico
  var ary = ccap.get();
  var txt = ary[0];
  var buf = ary[1];
  response.end(buf);
  console.log(txt);
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
```


### License

Copyright (c) 2013 wu zhonghua <snoopyxdy@gmail.com>

The MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.