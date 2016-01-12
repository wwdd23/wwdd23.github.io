---
layout: post
category : 技术
title: "使用OSX 原生读写挂载NTFS格式硬盘"
description: "nfts osx 原生读写挂载"
tagline: "技术就是生产力"
tags : [技术, 分享, OS, NTFS]
---



查看设备号

$ mount
卸载设备

由于在Mac上连接移动硬盘时，系统都会自动挂载，所以需要先从默认的挂载点卸载

$ sudo umount /dev/disk2s1
重新挂载

创建一个空目录，再将设备挂载到这个目录，然后就可以随意操作移动硬盘了

$ mkdir mnt
$ sudo mount_ntfs -o rw,nobrowse /dev/disk2s1 aaa
$ open aaa


操作即可
