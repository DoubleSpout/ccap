

#include <node.h>
#include <string>
#include <iostream>


#include "cap.h"
#include "jpeglib/CImg.h"

  
using namespace v8;
using namespace cimg_library;

namespace img_obj{
	std::string text;
	std::string filename;
	int count;
	int width;
	int height;
	int offset;
	int quality;
	int isjpeg;
  int fontSize;
}


/*
args
0-验证码文字
1-保存文件名
2-验证码文字长度
3-图片宽度
4-图片高度
5-偏移
return 文件的生成路径给node
*/
void cap::create(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  
  img_obj::text = toCString(args[0]->ToString());

  img_obj::filename = toCString(args[1]->ToString());
  
  img_obj::count = args[2]->Int32Value();
  img_obj::width = args[3]->Int32Value();
  img_obj::height = args[4]->Int32Value();
  img_obj::offset = args[5]->Int32Value();
  img_obj::quality = args[6]->Int32Value();
  img_obj::isjpeg = args[7]->Int32Value();
  img_obj::fontSize = args[8]->Int32Value();

  save();  
  
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, (img_obj::filename).c_str()));

}



int cap::save(){


   const char *captcha_text((img_obj::text).c_str());
   const char *file_o((img_obj::filename).c_str());
   int count(img_obj::count);
   int width(img_obj::width);
   int height(img_obj::height);
   int offset(img_obj::offset);
   int quality(img_obj::quality);
   int isjpeg(img_obj::isjpeg);
   int fontSize(img_obj::fontSize);

  // Create captcha image
  //----------------------

  // Write colored and distorted text
  CImg<unsigned char> captcha(width,height,1,3,0), color(3);
  const unsigned char red[] = { 255,0,0 }, green[] = { 0,255,0 }, blue[] = { 0,0,255 };

  char letter[2] = { 0 };
  for (unsigned int k = 0; k<count; ++k) {
    CImg<unsigned char> tmp;
    *letter = captcha_text[k];
    if (*letter) {
      cimg_forX(color,i) color[i] = (unsigned char)(128+(std::rand()%127));
      tmp.draw_text((int)(2+8*cimg::rand()),
                    (int)(12*cimg::rand()),
                    letter,
                    red,
                    0,
                    1,
                    fontSize).resize(-100,-100,1,3);
//      const unsigned int dir = std::rand()%4, wph = tmp.width()+tmp.height();
//      cimg_forXYC(tmp,x,y,v) {
//        const int val = dir==0?x+y:(dir==1?x+tmp.height()-y:(dir==2?y+tmp.width()-x:tmp.width()-x+tmp.height()-y));
//        tmp(x,y,v) = (unsigned char)cimg::max(0.0f,cimg::min(255.0f,1.5f*tmp(x,y,v)*val/wph));
//      }
      //if (std::rand()%2) tmp = (tmp.get_dilate(3)-=tmp);
      //tmp.blur((float)cimg::rand()*0.8f).normalize(0,255);
      const float sin_offset = (float)cimg::crand()*3, sin_freq = (float)cimg::crand()/7;
      cimg_forYC(captcha,y,v) captcha.get_shared_row(y,0,v).shift((int)(4*std::cos(y*sin_freq+sin_offset)));
      captcha.draw_image(count+offset*k,tmp);
    }
  }

  // Add geometric and random noise
  CImg<unsigned char> copy = (+captcha).fill(0);
  for (unsigned int l = 0; l<3; ++l) {
    if (l) copy.blur(0.5f).normalize(0,148);
    for (unsigned int k = 0; k<10; ++k) {
      cimg_forX(color,i) color[i] = (unsigned char)(128 + cimg::rand()*127);
      if (cimg::rand()<0.5f) copy.draw_circle((int)(cimg::rand()*captcha.width()),
                                              (int)(cimg::rand()*captcha.height()),
                                              (int)(cimg::rand()*30),
                                              color.data(),0.6f,~0U);
      else copy.draw_line((int)(cimg::rand()*captcha.width()),
                          (int)(cimg::rand()*captcha.height()),
                          (int)(cimg::rand()*captcha.width()),
                          (int)(cimg::rand()*captcha.height()),
                          color.data(),0.6f);
    }
  }
  captcha|=copy;
  captcha.noise(10,2);

  captcha = (+captcha).fill(255) - captcha;

  // Write output image and captcha text
  //-------------------------------------
  //std::printf("%s\n",captcha_text);

 if(isjpeg){
    captcha.save_jpeg(file_o, quality);
 }
 else{
	captcha.save(file_o);    
 }

  //std::printf("*********************\n");
  return 0;

}


std::string cap::toCString(Local<Value> strp){
      String::Utf8Value utf8_value(strp->ToString());//转化成v8::Utf8Value
      std::string str = *utf8_value;//转化为string
      return str;
}

cap::cap(){};
cap::~cap(){};