---
layout: post
category : 技术 
title: "MAC OS 中卸载HAXM "
description: "MAC OS 中卸载HAXM "
tagline: "How to faster"
tags : [技术, 分享, OS]
---

MAC OS 中卸载HAXM 

HAXM使用范围用于，OS中配置Android开发环境。


###Removing Intel® HAXM

#####Error Info
Warning: Close all instances of the Android* x86 emulator before removing Intel HAXM. Intel HAXM cannot be removed while in use.

To uninstall Intel HAXM, open a terminal window and execute this command:

#####How to remove it

sudo /System/Library/Extensions/intelhaxm.kext/Contents/Resources/uninstall.sh
