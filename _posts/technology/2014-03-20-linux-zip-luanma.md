---
layout: post
category : 技术
title: "linux解决win zip解压后文件名乱码问题"
description: ""
tagline: "windows linux 兼容问题"
tags : [技术, 分享, OS, 高大上]
---
###linux解决win zip解压后文件名乱码问题。

rfbrowse 只能在当前用户修改

需要在root 中的konsole中desktop添加默认网址。

但是无法在界面中添加ssl 证书等功能。

---
解决win下拷贝过来后 zip解压为乱码问题
---
LANG=C 7z x xx.zip

convmv -f cp936 -t utf-8 --notest -r filename
