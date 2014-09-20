#ifndef SV_H
#define SV_H
#include <node.h>
#include <v8.h>
#include <string>

using namespace v8;

class cap {

 public:
  static void create(const FunctionCallbackInfo<Value>& args);
  static int save();
  
 protected:
  static std::string toCString(Handle<Value> strp);

 private:
  cap();
  ~cap();
  
};

#endif