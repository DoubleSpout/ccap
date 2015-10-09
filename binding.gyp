{
  "targets":[
    {
      "target_name": "hcaptha",
      "conditions": [
            ["OS==\"mac\"", {   
                       "sources": [
                               "addon/hcaptha.cc" ,"addon/cap.cc"],
                               "libraries": [],
                               "cflags_cc": ["-fexceptions","-Dcimg_display=0"],
                               'xcode_settings': {
						            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
						          }
            }],
            ["OS==\"linux\"", {
                               "sources": ["addon/jpeglib/jaricom.c", "addon/jpeglib/jcapimin.c", "addon/jpeglib/jcapistd.c", 
                               "addon/jpeglib/jcarith.c","addon/jpeglib/jccoefct.c",
                               "addon/jpeglib/jccolor.c","addon/jpeglib/jcdctmgr.c", 
                               "addon/jpeglib/jchuff.c", "addon/jpeglib/jcinit.c", "addon/jpeglib/jcmainct.c",
                               "addon/jpeglib/jcmarker.c",
                               "addon/jpeglib/jcmaster.c", "addon/jpeglib/jcomapi.c", "addon/jpeglib/jcparam.c", 
                               "addon/jpeglib/jcprepct.c", "addon/jpeglib/jcsample.c", "addon/jpeglib/jctrans.c",
                               "addon/jpeglib/jdapimin.c", "addon/jpeglib/jdapistd.c",
                               "addon/jpeglib/jdarith.c", "addon/jpeglib/jdatadst.c",
                               "addon/jpeglib/jdatasrc.c", "addon/jpeglib/jdcoefct.c",
                               "addon/jpeglib/jdcolor.c", "addon/jpeglib/jddctmgr.c",
                               "addon/jpeglib/jdhuff.c", "addon/jpeglib/jdinput.c",
                               "addon/jpeglib/jdmainct.c", "addon/jpeglib/jdmarker.c",
                               "addon/jpeglib/jdmaster.c", "addon/jpeglib/jdmerge.c",
                               "addon/jpeglib/jdpostct.c", "addon/jpeglib/jdsample.c",
                               "addon/jpeglib/jdtrans.c", "addon/jpeglib/jerror.c",
                               "addon/jpeglib/jfdctflt.c","addon/jpeglib/jfdctfst.c",
                               "addon/jpeglib/jfdctint.c", "addon/jpeglib/jidctflt.c", 
                               "addon/jpeglib/jidctfst.c", "addon/jpeglib/jidctint.c",
                               "addon/jpeglib/jquant1.c", "addon/jpeglib/jquant2.c", 
                               "addon/jpeglib/jutils.c", "addon/jpeglib/jmemmgr.c",
                               "addon/jpeglib/jmemnobs.c",
                               "addon/hcaptha.cc" ,"addon/cap.cc"],
                               "libraries": [],
                               "cflags_cc": ["-fexceptions","-Dcimg_display=0","-Dcimg_use_jpeg","-L/usr/X11R6/lib","-lm","-lpthread","-lX11"],
                               "CMAKE_CC":["gcc-4.8"],
                               "CMAKE_CXX":["g++-4.8"],
                               "CMAKE_ARGS":["-DCMAKE_BUILD_TYPE=Release","-DUSE_OPENMP=ON","-DNO_CXX11=ON"]
            }],
            ["OS==\"win\"", {
                               "sources": ["addon/hcaptha.cc" ,"addon/cap.cc"],
                               "libraries": [],
                               "cflags": ["-fexceptions","-Dcimg_display=0"]
            }]
        ]
    }
  ]
}