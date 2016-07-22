---
layout: post
category : 技术
title: "多台设备使用github私钥"
description: "解决新配置机器无法推送github代码"
tagline: "github使用"
tags : [Linux,OS X,Github]
---


   新买一个mac mini后搭建了相关生产环境，今天在写日志是发现拷贝过来的id_rsa无法上传代码。

   解决方案如下：

1. 将原始id_rsa id_rsa.pub 拷贝到其他目录

2. 执行 

    $ssh-keygen -t rsa -C "your_email@example.com"
    `重新生成ssh-keygen`
3. 将原始公钥/私钥文件覆盖新生成的文件

    $cp id_rsa id_rsd.pub .ssh

此时运行尝试是否能够正常上传源码不？
