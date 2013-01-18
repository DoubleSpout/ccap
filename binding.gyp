{
  "targets":[
    {
      "target_name": "hcaptha",
      "sources": [ "addon/hcaptha.cc" ,"addon/cap.cc"],
      "cflags": ["-fexceptions","-Dcimg_display=0"],
      "cflags_cc": ["-fexceptions","-Dcimg_display=0"],
      "conditions": [
            ["OS==\"mac\"", {"libraries": []}],
            ["OS==\"linux\"", {"libraries": []}],
            ["OS==\"win\"", {"libraries": []}]
        ]
    }
  ]
}
