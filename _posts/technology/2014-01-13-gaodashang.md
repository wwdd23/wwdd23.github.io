---
layout: post
category : 技术
title: "如何高大上(装)"
description: "如何高大上(装)"
tagline: "技术就是生产力"
tags : [技术, 分享, OS, 高大上]
---

懒到极致就是，另一台工作用机就在床边1米处。
想要远程连接上去，看看当前rsync进度是多少了？

但就是不想动身过去翻开显示器，然后输入ifconfig查看无线分到了那个IP，如何登陆上去。

所以就在MAC中：
brew install nmap
安装nmap 工具。来查看下当前局域网中有那几个活着的IP在连接。

After brew install nmap,the brew can auto download nmap source ,and config , make the source ,install the tools into Mac OS.

When all ready!

enter :
nmap -sP 192.168.0.1/24
即可查看出当前活动的IP。

对应登陆到想登陆的IP的机器中。
就可以继续干活了。


个人点评，就是装逼加懒。

![](/images/1.jpeg)

![](/images/2.jpeg)

