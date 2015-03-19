#include <node.h>
#include "cap.h"

using namespace v8;

void Init(Handle<Object> target) {

//hcap
  NODE_SET_METHOD(target, "create", cap::create);


}

NODE_MODULE(hcaptha, Init)