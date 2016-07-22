---
layout: post
category : 技术
title: "Enable Scroll Lock Led in Linux"
description: "Linux 中点亮Scroll Lock键盘灯"
tagline: "Linux"
tags : [技术,Linux,xset,system]

---

Linux 中 Scroll Lock 键按下后 键盘灯不点亮。

使用 xev 调试有信息

###解决办法

使用命令：

    $xset led named "Scroll Lock"  #on
    $xset -led named "Scroll Lock" #off 

键盘灯可以选择亮起,但无锁定效果

需要通过脚本绑定按键信息。
