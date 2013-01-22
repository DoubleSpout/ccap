{
  "targets":[
    {
      "target_name": "hcaptha",
      "sources": [ "addon/hcaptha.cc" ,"addon/cap.cc"],
      "conditions": [
            ["OS==\"mac\"", {"libraries": [],
                               "cflags": ["-fexceptions","-Dcimg_display=0"],
                               "cflags_cc": ["-fexceptions","-Dcimg_display=0"],
            }],
            ["OS==\"linux\"", {"libraries": ["-ljpeg"],
                               "cflags": ["-fexceptions","-Dcimg_display=0","-Dcimg_use_jpeg"],
                               "cflags_cc": ["-fexceptions","-Dcimg_display=0","-Dcimg_use_jpeg"]
            }],
            ["OS==\"win\"", {"libraries": [],
                               "cflags": ["-fexceptions","-Dcimg_display=0"],
                               "cflags_cc": ["-fexceptions","-Dcimg_display=0"]
            }]
        ]
    }
  ]
}
